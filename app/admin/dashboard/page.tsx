"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/admin");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-muted">
        Checking session…
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-5 md:px-8 py-4 flex items-center justify-between">
        <div>
          <p className="font-display font-bold text-lg text-fg">
            CODARAFROJ <span className="text-muted font-normal">/ Control Panel</span>
          </p>
          <p className="font-mono text-xs text-muted">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-border text-xs font-mono uppercase hover:border-fg transition-colors"
          >
            <ExternalLink size={14} /> View Site
          </a>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-3 py-2 border border-border text-xs font-mono uppercase invert-hover transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <ProjectsManager />
      </div>
    </div>
  );
}
