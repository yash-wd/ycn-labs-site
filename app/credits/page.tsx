import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Credits & Provenance — YCN Labs",
  description:
    "Licence disclosures, creative commons attributions, and source provenance for media assets used across YCN Labs.",
  alternates: {
    canonical: "https://ycnlabs.com/credits",
  },
};

export default function CreditsPage() {
  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <p className="type-kicker text-[var(--action-blue)]">
          Transparency & Intellectual Property
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          Asset Credits & Provenance
        </h1>
        <p className="mt-2 type-copy-lead text-[var(--text-secondary)]">
          The licences behind what this website uses.
        </p>
      </div>

      {/* Owner decision 13 Nov 2026: unseen stock media removed; demonstration screens are drawn in code. */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-12 space-y-2">
        <p className="type-heading-card text-base font-semibold text-[var(--text-primary)]">
          Photos and video
        </p>
        <p className="type-copy-body text-[var(--text-secondary)]">
          The pages do not currently show any third-party photos or video. The demonstration screens are drawn in code by YCN Labs, and the names in them are illustrative.
        </p>
      </div>

      <div className="type-caption text-[var(--text-muted)] space-y-1">
        <p>
          Typography: Space Grotesk (Florian Karsten) and Inter (Rasmus Andersson) licensed under the SIL Open Font License 1.1.
        </p>
        <p>
          Icons: Lucide Icons licensed under the ISC License.
        </p>
      </div>
    </div>
  );
}
