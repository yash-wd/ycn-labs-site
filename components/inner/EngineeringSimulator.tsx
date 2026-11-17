"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import styles from "./inner-pages.module.css";

type SimState = "normal" | "email_fails" | "storage_fails";

export const SIM_SCENARIOS = {
  normal: {
    label: "Normal operation",
    badge: "200 ACCEPTED",
    title: "Enquiry stored & notification sent",
    desc: "1. Payload validated → 2. Saved to PostgreSQL with unique idempotency key → 3. Owner notified via Resend → 4. Confirmation receipt with lead ID returned.",
    icon: CheckCircle2,
    outcome: "Receipt displayed to visitor.",
  },
  email_fails: {
    label: "Email provider outage",
    badge: "200 ACCEPTED (RECOVERABLE)",
    title: "Storage succeeded; notification pending",
    desc: "1. Payload validated → 2. Saved to PostgreSQL → 3. Resend email fails → 4. Lead remains saved in database with status 'failed'.",
    icon: AlertTriangle,
    outcome: "The enquiry stays saved. The email can be re-sent.",
  },
  storage_fails: {
    label: "Database unavailable",
    badge: "503 SERVICE UNAVAILABLE",
    title: "No false receipt shown",
    desc: "1. Payload validated → 2. Database transaction fails → 3. System halts immediately → 4. Never promises confirmation when data wasn't saved.",
    icon: XCircle,
    outcome: "No enquiry is saved, and the visitor is told so. No false thank-you.",
  },
} as const;

export function EngineeringSimulator() {
  const [active, setActive] = useState<SimState>("normal");
  const current = SIM_SCENARIOS[active];
  const Icon = current.icon;

  return (
    <div className={styles.simulationBox} aria-label="Interactive failure mode simulation">
      <small className={styles.eyebrow}>INTERACTIVE ARCHITECTURE SIMULATION</small>
      <div>
        <span className={styles.simNotice}>
          Example only. This shows how the form is designed to behave.
        </span>
      </div>
      <h3 style={{ margin: "6px 0 10px", fontSize: "1.3rem" }}>
        How our enquiry pipeline handles failure
      </h3>
      <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-secondary)" }}>
        Choose a condition to inspect how the system behaves under real provider failure:
      </p>

      <div className={styles.simControls} role="group" aria-label="Failure condition selector">
        <button
          type="button"
          className={`${styles.simBtn} ${active === "normal" ? styles.simBtnActive : ""}`}
          onClick={() => setActive("normal")}
          aria-pressed={active === "normal"}
        >
          Normal flow
        </button>
        <button
          type="button"
          className={`${styles.simBtn} ${active === "email_fails" ? styles.simBtnActive : ""}`}
          onClick={() => setActive("email_fails")}
          aria-pressed={active === "email_fails"}
        >
          Email provider fails
        </button>
        <button
          type="button"
          className={`${styles.simBtn} ${active === "storage_fails" ? styles.simBtnActive : ""}`}
          onClick={() => setActive("storage_fails")}
          aria-pressed={active === "storage_fails"}
        >
          Database down
        </button>
      </div>

      <div className={styles.simOutput} role="status" aria-live="polite">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Icon size={18} strokeWidth={2} style={{ color: "var(--action-blue)" }} aria-hidden="true" />
          <small>{current.badge}</small>
        </div>
        <strong>{current.title}</strong>
        <p style={{ marginBottom: "8px" }}>{current.desc}</p>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
          Result: {current.outcome}
        </div>
      </div>
    </div>
  );
}
