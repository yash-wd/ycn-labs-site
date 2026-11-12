import type { ReactNode } from "react";

// YCN-V3-UI section kit. Every V3 section uses these so spacing, width and
// surfaces come from tokens (app/globals.css), not one-off values.

type Tone = "canvas" | "surface";
type Size = "default" | "tight";

const TONE: Record<Tone, string> = {
  canvas: "bg-[var(--bg-canvas)]",
  surface: "bg-[var(--bg-surface)]",
};
const SIZE: Record<Size, string> = {
  default: "py-[var(--space-4)] sm:py-[var(--space-5)] lg:py-[var(--space-6)]",
  tight: "py-[var(--space-4)] lg:py-[var(--space-5)]",
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--container-gutter)] ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  tone = "canvas",
  size = "default",
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${TONE[tone]} ${SIZE[size]}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="mb-[var(--space-4)] max-w-[var(--measure)]">
      <h2 id={id} className="type-heading-section font-display text-[var(--text-primary)]">
        {title}
      </h2>
      {lead ? <p className="type-copy-lead mt-[var(--space-2)] text-[var(--text-secondary)]">{lead}</p> : null}
    </div>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-[var(--space-3)]">
      <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      <div className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}
