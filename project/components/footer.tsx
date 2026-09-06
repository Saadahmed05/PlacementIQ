import Link from "next/link";
import { GraduationCap, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span>PlacementIQ</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Data-driven placement analytics for engineering, management, and
              pharmacy colleges.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/colleges" className="hover:text-foreground">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-foreground">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.linkedin.com/company/lokha-innovation-ecosystem/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-secondary transition-colors"
                aria-label="Lokha Innovation Ecosystem on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PlacementIQ. Data sourced from institutional
          submissions and public research. Built for informational purposes only.
        </div>
      </div>
    </footer>
  );
}