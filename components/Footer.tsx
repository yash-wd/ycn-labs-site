import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0E17] text-slate-600 dark:text-slate-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-36 h-8">
                <Image
                  src="/brand/ycn-logo-dark-transparent-224.png"
                  alt="YCN Labs"
                  fill
                  sizes="144px"
                  className="object-contain block dark:hidden"
                />
                <Image
                  src="/brand/ycn-logo-light-transparent-224.png"
                  alt="YCN Labs"
                  fill
                  sizes="144px"
                  className="object-contain hidden dark:block"
                />
              </div>
            </Link>
            <p className="type-copy-body text-slate-600 dark:text-slate-400 max-w-sm">
              YCN Labs — technology and software built around how businesses work.
            </p>
            <p className="type-caption text-slate-500 dark:text-slate-500">
              Software, engineered to hold up.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h3 className="type-kicker text-slate-900 dark:text-slate-200">
              Navigation
            </h3>
            <ul className="space-y-2 type-copy-body text-sm">
              <li>
                <Link href="/what-we-solve" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  What We Solve
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Legal Col */}
          <div className="space-y-3">
            <h3 className="type-kicker text-slate-900 dark:text-slate-200">
              Integrity & Legal
            </h3>
            <ul className="space-y-2 type-copy-body text-sm">
              <li>
                <Link href="/credits" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Asset Credits & Provenance
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0470B4] dark:hover:text-[#38BDF8] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 type-caption text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} YCN Labs. All rights reserved.</p>
          <p>Built with Next.js & TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
