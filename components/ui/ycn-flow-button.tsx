"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface YcnFlowButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "secondary" | "quiet";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  id?: string;
  "data-testid"?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | boolean;
}

/**
 * YcnFlowButton
 *
 * Core YCN interaction primitive adapting the FlowButton concept to YCN design canon:
 * - Idle radius: ~8px canonical button radius (docs/YCN_DESIGN_SYSTEM.md §5, Claude E2).
 * - Shape response: subtle radius shift from 8px to 10px on hover.
 * - Arrow choreography: leading arrow enters from left, trailing arrow exits right.
 * - Expanding fill: derived pseudo-fill expands to cover the control without layout shifts.
 * - Tokens: strictly derived from YCN theme variables (no arbitrary third-party color literals).
 * - Full accessibility: semantic <button> or Next.js <Link>, visible focus rings, reduced-motion bypass.
 */
export const YcnFlowButton = forwardRef<HTMLElement, YcnFlowButtonProps>(
  (
    {
      children,
      href,
      onClick,
      variant = "primary",
      size = "md",
      disabled = false,
      className = "",
      showArrow = true,
      type = "button",
      target,
      rel,
      id,
      "data-testid": dataTestId,
      "aria-label": ariaLabel,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-current": ariaCurrent,
    },
    ref
  ) => {
    // Sizing tokens ensuring minimum accessible tap areas
    const sizeClasses = {
      sm: "h-9 min-h-[36px] px-3.5 text-xs",
      md: "h-11 min-h-[44px] px-4.5 text-xs sm:text-sm",
      lg: "h-12 min-h-[48px] px-6 text-sm",
    }[size];

    // Variant style configurations
    const variantClasses = {
      primary:
        "bg-[var(--action-blue)] text-[var(--text-on-action)] border border-transparent hover:border-[var(--action-blue-hover)] shadow-xs hover:shadow-md",
      secondary:
        "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--action-blue)] shadow-xs",
      quiet:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-subtle)]/60",
    }[variant];

    // Expanding fill colors per variant
    const fillClasses = {
      primary: "bg-[var(--action-blue-hover)]",
      secondary: "bg-[var(--action-blue)]/15 dark:bg-[var(--action-blue)]/20",
      quiet: "bg-[var(--bg-surface)]",
    }[variant];

    const baseClasses = [
      "group relative inline-flex items-center justify-center overflow-hidden font-semibold tracking-[0.01em] select-none cursor-pointer",
      "rounded-[8px] hover:rounded-[10px] transition-all duration-300 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]",
      "active:scale-[0.98] active:transition-transform active:duration-100",
      disabled ? "opacity-45 pointer-events-none cursor-not-allowed" : "",
      sizeClasses,
      variantClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {/* Contained expanding fill layer */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-[inherit] ${fillClasses} scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-out origin-center pointer-events-none motion-reduce:hidden`}
        />

        {/* Content container */}
        <span className="relative z-10 flex items-center justify-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
          {/* Leading arrow (enters from left on hover) */}
          {showArrow && (
            <span
              aria-hidden="true"
              className="inline-flex items-center -ml-2 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out motion-reduce:hidden"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          )}

          {/* Label text */}
          <span className="transition-transform duration-300 ease-out motion-reduce:transform-none">
            {children}
          </span>

          {/* Trailing arrow (exits to right on hover) */}
          {showArrow && (
            <span
              aria-hidden="true"
              className="inline-flex items-center translate-x-0 opacity-100 group-hover:translate-x-3 group-hover:opacity-0 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:opacity-100"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          id={id}
          data-testid={dataTestId}
          onClick={onClick}
          className={baseClasses}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        id={id}
        data-testid={dataTestId}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={baseClasses}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        {content}
      </button>
    );
  }
);

YcnFlowButton.displayName = "YcnFlowButton";
