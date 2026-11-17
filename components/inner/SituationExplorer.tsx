"use client";

import { useState } from "react";
import { MessageSquare, ListTodo, FileSpreadsheet, Layers, Compass, BarChart3 } from "lucide-react";
import styles from "./inner-pages.module.css";

export const SITUATIONS = [
  {
    id: "whatsapp-faq",
    num: "01",
    icon: MessageSquare,
    quote: "Customers ask the same five questions on WhatsApp all day.",
    build: "One page that answers them: services, timings, location, enquiry button.",
    honest: "Often a two-page job, not a big website.",
    category: "Service Website",
  },
  {
    id: "missed-enquiries",
    num: "02",
    icon: ListTodo,
    quote: "We can't tell which enquiries we answered.",
    build: "One list: who asked, who is handling it, replied or not.",
    honest: "Under ten enquiries a week, a well-made shared sheet may be enough.",
    category: "Request Tracker",
  },
  {
    id: "word-quotes",
    num: "03",
    icon: FileSpreadsheet,
    quote: "Every quotation takes an hour in Word.",
    build: "A form that builds the quotation from your rates.",
    honest: "Start with your three most common jobs.",
    category: "Quotation Builder",
  },
  {
    id: "split-sheets",
    num: "04",
    icon: Layers,
    quote: "Stock is in one sheet, orders in another, and nobody trusts either.",
    build: "One screen where an order reduces stock by itself.",
    honest: "Your existing sheets need cleaning first. We help with that.",
    category: "Inventory & Orders",
  },
  {
    id: "quiet-website",
    num: "05",
    icon: Compass,
    quote: "Our website looks fine, but nobody enquires.",
    build: "We check what a first-time visitor sees and how many steps an enquiry takes. A rebuild is the last option, not the first.",
    honest: "A rebuild is the last option, not the first.",
    category: "Journey Clarity",
  },
  {
    id: "month-end-drag",
    num: "06",
    icon: BarChart3,
    quote: "Month-end reports take two days.",
    build: "A report that prepares itself from data you already enter.",
    honest: "Only worth it if the same report repeats.",
    category: "Reporting Automation",
  },
] as const;

export function SituationExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={styles.situationGrid} role="region" aria-label="Six common business situations">
      {SITUATIONS.map((s) => {
        const Icon = s.icon;
        const isSelected = activeId === s.id;
        return (
          <article
            key={s.id}
            className={styles.situationCard}
            style={{
              borderColor: isSelected ? "var(--action-blue)" : undefined,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className={styles.situationNum}>{s.num} / {s.category.toUpperCase()}</span>
                <button
                  type="button"
                  className={styles.situationToggleBtn}
                  aria-pressed={isSelected}
                  aria-label={`Highlight situation ${s.num}: ${s.quote}`}
                  onClick={() => setActiveId(isSelected ? null : s.id)}
                >
                  <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span>{isSelected ? "Selected" : "Select"}</span>
                </button>
              </div>
              <h2 className={styles.quoteHeader}>“{s.quote}”</h2>
              <div className={styles.buildBlock}>
                <span className={styles.buildLabel}>What we would build</span>
                <p className={styles.buildText}>{s.build}</p>
              </div>
            </div>
            <div className={styles.honestBlock}>
              <span className={styles.honestLabel}>Honest note</span>
              <p className={styles.honestText}>{s.honest}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
