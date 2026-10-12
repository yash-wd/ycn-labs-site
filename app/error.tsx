"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-3">Something went wrong</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
        An unexpected error occurred while loading this page. You can try again or return to the homepage.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-md bg-[#0470B4] hover:bg-[#035b94] text-white font-medium text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
