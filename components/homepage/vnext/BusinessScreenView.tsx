"use client";

import React from "react";
import { User, CheckCircle2, Clock, Inbox, ArrowUpRight } from "lucide-react";

interface RequestItem {
  id: string;
  title: string;
  source: string;
  owner: string;
  nextStep: string;
  status: "Assigned" | "Confirmed" | "Reply sent";
}

const SAMPLE_REQUESTS: RequestItem[] = [
  {
    id: "REQ-01",
    title: "Website enquiry",
    source: "Direct enquiry",
    owner: "Design Lead",
    nextStep: "Review scope with customer",
    status: "Assigned",
  },
  {
    id: "REQ-02",
    title: "Service booking",
    source: "Online booking",
    owner: "Delivery Lead",
    nextStep: "Confirm schedule & send intake link",
    status: "Confirmed",
  },
  {
    id: "REQ-03",
    title: "Order request",
    source: "Quote request",
    owner: "Operations",
    nextStep: "Dispatch scope and preliminary terms",
    status: "Reply sent",
  },
];

export function BusinessScreenView({
  isFullScreen = false,
  className = "",
}: {
  isFullScreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-full flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] select-text ${
        isFullScreen ? "p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto" : "p-3 sm:p-4 text-[11px]"
      } ${className}`}
      aria-label="Business interface: Active requests"
    >
      {/* Top Header Bar */}
      <div
        className={`flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3 ${
          isFullScreen ? "pb-5 mb-6" : "pb-2 mb-2"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`rounded-lg bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center ${
              isFullScreen ? "w-10 h-10" : "w-6 h-6"
            }`}
          >
            <Inbox className={isFullScreen ? "w-5 h-5" : "w-3.5 h-3.5"} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`font-bold tracking-tight text-[var(--text-primary)] font-display ${
                  isFullScreen ? "text-xl sm:text-2xl" : "text-xs sm:text-sm"
                }`}
              >
                Requests
              </h3>
            </div>
            <p
              className={`text-[var(--text-secondary)] ${
                isFullScreen ? "text-sm mt-0.5" : "text-[9px]"
              }`}
            >
              Every request has a name and a next step.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={isFullScreen ? "text-xs font-medium" : "text-[9px]"}>
            System active
          </span>
        </div>
      </div>

      {/* Main Table / Queue */}
      <div className="flex-1 flex flex-col justify-start">
        {/* Table Header (Desktop/Medium and above) */}
        <div
          className={`grid grid-cols-12 gap-2 font-mono uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-subtle)] ${
            isFullScreen
              ? "text-xs pb-3 mb-2 font-semibold"
              : "text-[8px] pb-1.5 mb-1.5 hidden sm:grid"
          }`}
        >
          <div className="col-span-5 sm:col-span-4">Request</div>
          <div className="col-span-3 sm:col-span-3">Owner</div>
          <div className="col-span-4 sm:col-span-3">Next step</div>
          <div className="col-span-2 text-right hidden sm:block">Status</div>
        </div>

        {/* Request Rows */}
        <div className={`space-y-2 ${isFullScreen ? "space-y-3" : "space-y-1.5"}`}>
          {SAMPLE_REQUESTS.map((req) => (
            <div
              key={req.id}
              className={`rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] transition-colors ${
                isFullScreen
                  ? "p-4 grid grid-cols-12 gap-4 items-center"
                  : "p-2 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center flex flex-col gap-1"
              }`}
            >
              {/* Title & Source */}
              <div className={isFullScreen ? "col-span-4" : "sm:col-span-4"}>
                <span
                  className={`font-semibold text-[var(--text-primary)] block leading-snug ${
                    isFullScreen ? "text-base font-display" : "text-[11px]"
                  }`}
                >
                  {req.title}
                </span>
                <span
                  className={`text-[var(--text-secondary)] block font-mono ${
                    isFullScreen ? "text-xs mt-0.5" : "text-[9px]"
                  }`}
                >
                  {req.source}
                </span>
              </div>

              {/* Owner */}
              <div
                className={`flex items-center gap-1.5 text-[var(--text-primary)] ${
                  isFullScreen ? "col-span-3 text-sm" : "sm:col-span-3 text-[10px]"
                }`}
              >
                <div
                  className={`rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 ${
                    isFullScreen ? "w-6 h-6" : "w-4 h-4"
                  }`}
                >
                  <User className={isFullScreen ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
                </div>
                <span className="font-medium">{req.owner}</span>
              </div>

              {/* Next Step */}
              <div
                className={`text-[var(--text-secondary)] flex items-center gap-1.5 ${
                  isFullScreen ? "col-span-3 text-sm" : "sm:col-span-3 text-[10px]"
                }`}
              >
                <Clock
                  className={`shrink-0 text-[var(--text-muted)] ${
                    isFullScreen ? "w-4 h-4" : "w-3 h-3"
                  }`}
                />
                <span className="truncate">{req.nextStep}</span>
              </div>

              {/* Status Badge */}
              <div
                className={`flex justify-end items-center ${
                  isFullScreen ? "col-span-2" : "sm:col-span-2 self-start sm:self-auto"
                }`}
              >
                {req.status === "Assigned" && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-[var(--action-blue)]/15 border border-[var(--action-blue)]/30 text-[var(--action-blue)] font-semibold ${
                      isFullScreen ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[9px]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-blue)]" />
                    <span>Assigned</span>
                  </span>
                )}
                {req.status === "Confirmed" && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-[var(--signal-cyan)]/15 border border-[var(--signal-cyan)]/30 text-[var(--signal-cyan)] font-semibold ${
                      isFullScreen ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[9px]"
                    }`}
                  >
                    <CheckCircle2
                      className={isFullScreen ? "w-3.5 h-3.5" : "w-2.5 h-2.5"}
                    />
                    <span>Confirmed</span>
                  </span>
                )}
                {req.status === "Reply sent" && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold ${
                      isFullScreen ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[9px]"
                    }`}
                  >
                    <ArrowUpRight
                      className={isFullScreen ? "w-3.5 h-3.5" : "w-2.5 h-2.5"}
                    />
                    <span>Reply sent</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom In-Device Sample Footnote */}
      <div
        className={`border-t border-[var(--border-subtle)] text-center text-[var(--text-secondary)] mt-auto ${
          isFullScreen ? "pt-4 text-xs" : "pt-2 text-[9px]"
        }`}
      >
        <span>Sample · business view</span>
      </div>
    </div>
  );
}
