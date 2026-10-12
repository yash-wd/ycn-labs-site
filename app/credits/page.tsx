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
          We maintain strict provenance for all media assets used in our website. Below is the complete record of imagery and video sources, creators, and applicable licences:
        </p>
      </div>

      {/* Mandatory CC BY 2.0 Attribution Callout */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-12 space-y-2">
        <span className="type-kicker text-[var(--action-blue)]">
          Creative Commons Attribution
        </span>
        <p className="type-heading-card text-base font-semibold text-[var(--text-primary)]">
          Photo by Solmaz Zohdi (Flickr) / CC BY 2.0
        </p>
        <p className="type-caption text-[var(--text-secondary)]">
          Source file: <code className="bg-[var(--bg-canvas)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] type-mono break-all">small_business_proprietor_counter.jpg</code> via Wikimedia Commons. Licensed under Creative Commons Attribution 2.0 Generic (CC BY 2.0).
        </p>
      </div>

      {/* Full Provenance Table */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-xs mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text-secondary)]">
            <thead className="bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] type-mono text-xs uppercase font-semibold border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-4">Asset Name</th>
                <th className="p-4">Creator / Source</th>
                <th className="p-4">Licence</th>
                <th className="p-4">Usage Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  small_business_proprietor_counter.jpg
                </td>
                <td className="p-4">Solmaz Zohdi via Flickr / Wikimedia Commons</td>
                <td className="p-4 font-medium text-[var(--action-blue)] type-mono">CC BY 2.0</td>
                <td className="p-4">Proprietor / Workplace narrative photo</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  customer_hand_holding_smartphone.jpg
                </td>
                <td className="p-4">Dennis Cortés via Unsplash / Wikimedia Commons</td>
                <td className="p-4 type-mono">CC0 1.0 (Public Domain)</td>
                <td className="p-4">Hero customer smartphone preview poster</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  person_working_receiving_laptop.jpg
                </td>
                <td className="p-4">Bench Accounting via Unsplash / Wikimedia Commons</td>
                <td className="p-4 type-mono">CC0 1.0 (Public Domain)</td>
                <td className="p-4">Hero business laptop preview poster</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  clean_organised_laptop_desk.jpg
                </td>
                <td className="p-4">Aleksi Tappura via Unsplash / Wikimedia Commons</td>
                <td className="p-4 type-mono">CC0 1.0 (Public Domain)</td>
                <td className="p-4">Workspace architecture connection visual</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  business_owner_at_desk_notes.jpg
                </td>
                <td className="p-4">JESHOOTS.COM via Unsplash / Wikimedia Commons</td>
                <td className="p-4 type-mono">CC0 1.0 (Public Domain)</td>
                <td className="p-4">Small business owner workflow reference</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  clip1_hands_using_smartphone_6s.mp4
                </td>
                <td className="p-4">Mixkit Free Stock Video Library</td>
                <td className="p-4 type-mono">Mixkit Free License</td>
                <td className="p-4">Desktop hero looping customer video</td>
              </tr>
              <tr>
                <td className="p-4 type-mono font-medium text-[var(--text-primary)]">
                  clip2_person_working_laptop_6s.mp4
                </td>
                <td className="p-4">Mixkit Free Stock Video Library</td>
                <td className="p-4 type-mono">Mixkit Free License</td>
                <td className="p-4">Desktop hero looping laptop video</td>
              </tr>
            </tbody>
          </table>
        </div>
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
