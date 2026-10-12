import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-20">
      <div className="max-w-md space-y-6">
        <span className="type-kicker text-[var(--action-blue)] px-3 py-1 rounded-md bg-[var(--action-blue)]/10">
          404 Not Found
        </span>

        <h1 className="type-display-page text-[var(--text-primary)]">
          This path does not go anywhere.
        </h1>

        <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
          The link you followed may be outdated, mistyped, or the route has been consolidated into our outcome-led structure.
        </p>

        {/* Clear Recovery Pathways */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] type-control text-xs font-semibold normal-case tracking-[0.01em] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] type-control text-xs font-semibold normal-case tracking-[0.01em] transition-colors min-h-[44px]"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] type-control text-xs font-semibold normal-case tracking-[0.01em] transition-colors min-h-[44px] shadow-xs"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
