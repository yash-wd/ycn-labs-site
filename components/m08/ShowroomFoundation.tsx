'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import {
  Globe,
  Smartphone,
  Workflow,
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  Info,
} from 'lucide-react';
import {
  SHOWROOM_MODES,
  SHOWROOM_DISCLOSURE,
  SELECTOR_GROUP_LABEL,
  ShowroomMode,
} from './showroomModes';
import styles from './ShowroomFoundation.module.css';

export function ShowroomFoundation() {
  const [activeMode, setActiveMode] = useState<ShowroomMode>('website');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = SHOWROOM_MODES.findIndex((m) => m.id === activeMode);
  const activeMeta = SHOWROOM_MODES[activeIndex] || SHOWROOM_MODES[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = SHOWROOM_MODES.length;
    let nextIndex = index;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + count) % count;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = count - 1;
    } else {
      return;
    }

    const nextMode = SHOWROOM_MODES[nextIndex].id;
    setActiveMode(nextMode);
    tabRefs.current[nextIndex]?.focus();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className={styles.selectorIcon} aria-hidden="true" />;
      case 'Smartphone':
        return <Smartphone className={styles.selectorIcon} aria-hidden="true" />;
      case 'Workflow':
        return <Workflow className={styles.selectorIcon} aria-hidden="true" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className={styles.selectorIcon} aria-hidden="true" />;
      case 'ShoppingBag':
        return <ShoppingBag className={styles.selectorIcon} aria-hidden="true" />;
      case 'GraduationCap':
        return <GraduationCap className={styles.selectorIcon} aria-hidden="true" />;
      default:
        return <Globe className={styles.selectorIcon} aria-hidden="true" />;
    }
  };

  return (
    <section aria-labelledby="showroom-title" className={styles.showroom} id="showroom">
      <div className={styles.showroomWrap}>
        <h2 id="showroom-title" className={styles.showroomTitle}>
          Explore what we can build
        </h2>
        <p className={styles.showroomLead}>
          Pick an example and try it. Everything here is a demo.
        </p>

        {/* 6-Button Accessible Selector Grid */}
        <div
          role="tablist"
          aria-label={SELECTOR_GROUP_LABEL}
          className={styles.selectors}
        >
          {SHOWROOM_MODES.map((mode, index) => {
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tab-${mode.id}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`panel-${mode.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={styles.selector}
                onClick={() => setActiveMode(mode.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {renderIcon(mode.icon)}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mode Caption */}
        <div className={styles.modeMeta}>
          <p id="mode-caption">{activeMeta.caption}</p>
        </div>

        {/* Live Announcement for Screen Readers */}
        <p role="status" aria-live="polite" className={styles.srOnly} id="mode-announcement">
          {`${activeMeta.label} example selected.`}
        </p>

        {/* Interactive Stage Region / Foundation Shell (all 6 tabpanels in DOM to satisfy aria-controls) */}
        {SHOWROOM_MODES.map((mode) => {
          const isSelected = activeMode === mode.id;
          return (
            <div
              key={mode.id}
              id={`panel-${mode.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${mode.id}`}
              aria-label={mode.stageLabel}
              hidden={!isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={styles.stage}
            >
              <div className={styles.stagePlaceholder}>
                <span className={styles.stagePlaceholderChip}>
                  {renderIcon(mode.icon)}
                  <span>{mode.label}</span>
                </span>
                <h3 className={styles.stagePlaceholderTitle}>
                  {mode.label} Demonstration Shell
                </h3>
                <p className={styles.stagePlaceholderText}>{mode.caption}</p>
                <p className={styles.stagePlaceholderText}>
                  Modular client component will be mounted here in subsequent phases (M08-B / M08-C / M08-D).
                </p>
              </div>
            </div>
          );
        })}

        {/* Fictional Concept Disclosure Banner */}
        <div className={styles.disclosure} id="demo-disclosure">
          <Info className={styles.disclosureIcon} aria-hidden="true" />
          <p>{SHOWROOM_DISCLOSURE}</p>
        </div>
      </div>
    </section>
  );
}
