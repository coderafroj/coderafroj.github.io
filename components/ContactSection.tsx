"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-display font-extrabold text-6xl text-outline leading-none block mb-4 select-none">
            04
          </span>
          <span className="font-mono text-xs tracking-widest text-muted uppercase block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-fg mb-4">
            Let&apos;s build <span className="italic font-light">something.</span>
          </h2>
          <p className="text-fg-dim mb-8 max-w-sm border-l-2 border-fg pl-4">
            Whether it&apos;s a freelance project, buying one of my builds, or just a chat about
            code — reach out.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/coderafroj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-border hover:border-fg invert-hover transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/afroj-ahmad-6a626729a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-border hover:border-fg invert-hover transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://x.com/codarafroj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-border hover:border-fg invert-hover transition-colors"
              aria-label="Twitter"
            >
              <XIcon size={18} />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          action="https://getform.io/f/bpjpkmzb"
          method="POST"
          onSubmit={handleSubmit}
          className="card-frame p-6 md:p-8 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="YOUR NAME"
            required
            className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono placeholder:text-muted focus:border-fg outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="YOUR EMAIL"
            required
            className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono placeholder:text-muted focus:border-fg outline-none transition-colors"
          />
          <textarea
            name="message"
            placeholder="YOUR MESSAGE"
            required
            rows={5}
            className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono placeholder:text-muted focus:border-fg outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-fg text-bg font-semibold text-sm uppercase tracking-wide hover:bg-fg-dim transition-colors disabled:opacity-60"
          >
            <Send size={14} />
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-fg-dim text-xs font-mono">Something went wrong — try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
