"use client";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-secondary-dark text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-start justify-between">
        <div className="text-sm">
          <h2 className="text-lg font-bold text-xs text-muted-foreground mb-1">Rule34 Race</h2>
          <p className="text-xs text-muted-foreground">
            A tag-based navigation challenge powered by the Rule34 API.
          </p>
        </div>
        <div className="bg-secondary-dark/50 text-center py-3">
          <p className="text-xs text-muted-foreground">
            © 2025 Rule34 Race. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-xs text-muted-foreground  mt-4 md:mt-0">
          <a
            href="https://paypal.me/VersuchenSieEsErneut"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            Support: 🤑🫰💸
          </a>
          {/* <Link href="/privacy" className="hover:text-accent transition">
            Privacy Policy
          </Link> */}
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/TommyCoo1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            <Github size={18} />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            <Twitter size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
