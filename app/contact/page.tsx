import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, ShieldCheck, FileCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import styles from "@/components/inner/inner-pages.module.css";

export const metadata: Metadata = {
  title: "Start a Project — YCN Labs",
  description:
    "What's difficult in your business right now? A few lines in your own words are enough. Tell us what is slow, lost or difficult today.",
  alternates: {
    canonical: "https://ycnlabs.com/contact",
  },
};

const CHANNELS = [
  { icon: Phone, label: "Call directly", value: "+91 83412 26694", href: "tel:+918341226694" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/918341226694", external: true },
  { icon: Mail, label: "Email", value: "hello@ycnlabs.com", href: "mailto:hello@ycnlabs.com" },
];

export default function ContactPage() {
  return (
    <div className={styles.pageWrap}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / CONTACT</p>
          <h1>What&apos;s difficult in your business right now?</h1>
          <p className={styles.heroLead}>
            A few lines in your own words are enough. No technical brief needed.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          {/* Left Column: Direct channels and reassurance */}
          <div>
            <div className={styles.infoBox} style={{ marginBottom: "20px" }}>
              <span className={styles.eyebrow}>WHAT HAPPENS NEXT</span>
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.3rem", margin: "4px 0 10px" }}>
                What happens after I send this?
              </h2>
              <p style={{ marginBottom: "12px" }}>
                Your enquiry is saved first. We read it ourselves and reply by email. We discuss scope before anyone commits to anything.
              </p>
              <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.88rem" }}>
                  <ShieldCheck size={16} strokeWidth={2} style={{ color: "var(--action-blue)", marginTop: "2px", flexShrink: 0 }} aria-hidden="true" />
                  <span>Your information is never sold or used for marketing lists.</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.88rem" }}>
                  <FileCheck size={16} strokeWidth={2} style={{ color: "var(--action-blue)", marginTop: "2px", flexShrink: 0 }} aria-hidden="true" />
                  <span>We discuss scope and send a written quote before anyone commits to anything.</span>
                </div>
              </div>
            </div>

            <section aria-labelledby="direct-channels-heading">
              <h2 id="direct-channels-heading" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.2rem", margin: "0 0 12px" }}>
                Prefer to talk directly?
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                {CHANNELS.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 18px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-surface)",
                        textDecoration: "none",
                        color: "inherit",
                        minHeight: "56px",
                      }}
                    >
                      <Icon size={18} strokeWidth={2} style={{ color: "var(--action-blue)", flexShrink: 0 }} aria-hidden="true" />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{label}</span>
                        <strong style={{ fontSize: "0.95rem" }}>{value}</strong>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "16px" }}>
                Based in Hyderabad, India, working with businesses across India.
              </p>
            </section>
          </div>

          {/* Right Column: Working Contact Form */}
          <div
            style={{
              border: "1px solid var(--border-subtle)",
              borderRadius: "20px",
              background: "var(--bg-surface)",
              padding: "28px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span className={styles.eyebrow}>ENQUIRY FORM</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                For example: enquiries come on WhatsApp and nobody knows who replied.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
