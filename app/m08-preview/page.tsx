import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/m08/HeroSection';
import { ShowroomFoundation } from '@/components/m08/ShowroomFoundation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'M08-A Foundation Preview · YCN Labs',
  robots: { index: false, follow: false },
};

export default function M08PreviewPage() {
  // Fail-safe protection: development only.
  // Returns HTTP 404 in production and deployed staging builds.
  // Strictly accessible only on local development workstation (NODE_ENV !== 'production' && !NETLIFY).
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NETLIFY === 'true' ||
    process.env.CONTEXT === 'production' ||
    process.env.CONTEXT === 'deploy-preview' ||
    process.env.CONTEXT === 'branch-deploy'
  ) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <div className="bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 text-xs px-4 py-2 border-b border-amber-300 dark:border-amber-800 text-center font-medium">
        Development Preview Only — M08-A Hero &amp; Showroom Foundation (Not active on public homepage)
      </div>
      <HeroSection />
      <ShowroomFoundation />
    </div>
  );
}
