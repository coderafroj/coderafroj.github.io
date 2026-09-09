import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";

// Uploads a base64 image to a GitHub repo via the Contents API and returns
// the raw.githubusercontent.com URL. The GitHub token NEVER reaches the
// browser — it only lives in server env vars (see .env.local.example).
//
// Auth: requires a valid Firebase ID token in the Authorization header,
// so only a logged-in admin can trigger an upload.

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const idToken = authHeader.replace("Bearer ", "");
    if (!idToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
      await getAdminAuth().verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Invalid session or server not configured" }, { status: 401 });
    }

    const { base64, fileName } = await req.json();
    if (!base64 || !fileName) {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!token || !owner || !repo) {
      return NextResponse.json(
        { error: "GitHub upload is not configured on the server" },
        { status: 500 }
      );
    }

    const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const path = `project-images/${safeName}`;

    const ghResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `chore: upload project image ${safeName}`,
          content: cleanBase64,
          branch,
        }),
      }
    );

    if (!ghResponse.ok) {
      const errText = await ghResponse.text();
      return NextResponse.json(
        { error: `GitHub upload failed: ${errText}` },
        { status: 502 }
      );
    }

    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    return NextResponse.json({ url: rawUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
