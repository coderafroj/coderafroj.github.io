import { auth, isFirebaseConfigured } from "./firebase";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

/** Uploads an image file to GitHub (via /api/upload-image) and returns its raw URL. */
export async function uploadProjectImage(file: File): Promise<string> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase is not configured yet. Add your env vars first.");
  }
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("You must be logged in to upload images.");

  const idToken = await currentUser.getIdToken();
  const base64 = await fileToBase64(file);

  const res = await fetch("/api/upload-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ base64, fileName: file.name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}
