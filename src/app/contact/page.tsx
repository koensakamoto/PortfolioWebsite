"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4 inline-block border-b-4 border-accent pb-2">
            Contact
          </h1>
          <p className="text-muted-foreground mb-12">
            Have a question or want to work together? Reach out.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-foreground mb-4">Get in touch</h2>
              <div className="space-y-4">
                <a
                  href="mailto:koensakamoto6@gmail.com"
                  className="flex items-center gap-3 p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <span className="p-2 bg-accent text-accent-foreground rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span className="font-medium">koensakamoto6@gmail.com</span>
                </a>

                <a
                  href="https://github.com/koensakamoto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <span className="p-2 bg-accent text-accent-foreground rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </span>
                  <span className="font-medium">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/koensakamoto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <span className="p-2 bg-accent text-accent-foreground rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-foreground mb-4">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-accent transition-colors"
                />
                <textarea
                  placeholder="Message"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                    ? "Sent!"
                    : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
