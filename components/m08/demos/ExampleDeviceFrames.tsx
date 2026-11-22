'use client';

import React, { ReactNode } from 'react';
import styles from './ExampleDemos.module.css';

interface DeviceFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Tablet Frame: Landscape orientation used for Websites demo.
 */
export function ExampleTabletFrame({ children, className = '' }: DeviceFrameProps) {
  return (
    <div className={`${styles.device} ${styles.tabletDevice} ${className}`} data-device="tablet">
      <div className={styles.hardware}>
        <div className={styles.productScreen}>{children}</div>
      </div>
    </div>
  );
}

/**
 * Phone Frame: Vertical smartphone shell used for Web apps demo.
 * Top status glyphs are proper SVGs with aria-hidden="true" and focusable="false".
 */
export function ExamplePhoneFrame({ children, className = '' }: DeviceFrameProps) {
  return (
    <div className={`${styles.device} ${styles.phoneDevice} ${className}`} data-device="phone">
      <div className={styles.hardware}>
        <div className={styles.productScreen}>
          {/* Phone Top Status Bar */}
          <div className={styles.phoneTop}>
            <span>9:41</span>
            <div className={styles.phoneStatusIcons} aria-hidden="true">
              {/* Signal / Wifi SVG */}
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 9.5H3V11.5H1V9.5ZM4.5 7H6.5V11.5H4.5V7ZM8 4.5H10V11.5H8V4.5ZM11.5 2H13.5V11.5H11.5V2Z"
                  fill="currentColor"
                />
              </svg>
              {/* Battery SVG */}
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <rect
                  x="0.75"
                  y="0.75"
                  width="14.5"
                  height="8.5"
                  rx="2.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect x="2.5" y="2.5" width="8" height="5" rx="1" fill="currentColor" />
                <path
                  d="M16.5 3.5V6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable Phone Content */}
          <div className={styles.phoneContent}>{children}</div>

          {/* Phone Bottom Home Bar */}
          <div className={styles.phoneBottom} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/**
 * Monitor Frame: Desktop screen with stand and foot used for CRM & admin demo.
 */
export function ExampleMonitorFrame({ children, className = '' }: DeviceFrameProps) {
  return (
    <div className={`${styles.device} ${styles.monitorDevice} ${className}`} data-device="monitor">
      <div className={styles.hardware}>
        <div className={styles.productScreen}>{children}</div>
      </div>
      <div className={styles.monitorStand} aria-hidden="true" />
      <div className={styles.monitorFoot} aria-hidden="true" />
    </div>
  );
}
