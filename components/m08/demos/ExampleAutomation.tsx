'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ExampleDemos.module.css';

export type AutoPhase =
  | 'idle'
  | 'running'
  | 'paused'
  | 'await_confirm'
  | 'await_complete'
  | 'failed'
  | 'done';

export type AutoStatus = 'done' | 'active' | 'waiting' | 'failed' | 'idle';

export type RecipientPhone = 'owner' | 'customer';

export interface AutoStep {
  title: string;
  kind: string;
  summary: string;
  iconName: 'send' | 'file' | 'bell' | 'calendar' | 'wrench' | 'check';
}

export interface NotificationItem {
  title: string;
  text: string;
}

export const AUTO_STEPS: AutoStep[] = [
  {
    title: 'A customer sends a request',
    kind: 'Starts it',
    summary: 'Anita asks for a tap repair and prefers Saturday morning.',
    iconName: 'send',
  },
  {
    title: 'The request is saved',
    kind: 'Happens by itself',
    summary: 'The request is saved as a new record.',
    iconName: 'file',
  },
  {
    title: 'The owner gets an alert',
    kind: 'Happens by itself',
    summary: 'The owner sees an alert on their phone.',
    iconName: 'bell',
  },
  {
    title: 'The owner confirms the visit',
    kind: 'Needs a person',
    summary:
      'The owner confirms Saturday morning. Only then is the customer told the visit is confirmed.',
    iconName: 'calendar',
  },
  {
    title: 'The technician marks the job done',
    kind: 'Needs a person',
    summary: 'The technician marks the repair as finished.',
    iconName: 'wrench',
  },
  {
    title: 'The customer gets an update',
    kind: 'Happens by itself',
    summary: 'The customer sees that the job is done.',
    iconName: 'check',
  },
];

function getAutoStatus(
  i: number,
  phase: AutoPhase,
  step: number,
  done: Set<number>
): AutoStatus {
  if (done.has(i)) return 'done';
  if (phase === 'failed' && i === 2) return 'failed';
  if ((phase === 'await_confirm' && i === 3) || (phase === 'await_complete' && i === 4)) {
    return 'waiting';
  }
  if (step === i && (phase === 'running' || phase === 'paused')) {
    return 'active';
  }
  return 'idle';
}

export function formatAutoStatus(phase: AutoPhase, step: number): string {
  switch (phase) {
    case 'idle':
      return 'Ready. Press Run example.';
    case 'running':
      return `Running step ${step + 1} of 6.`;
    case 'paused':
      return `Paused at step ${step + 1} of 6.`;
    case 'failed':
      return 'Owner alert failed. Try that step again.';
    case 'await_confirm':
      return 'Waiting for the owner to confirm the visit.';
    case 'await_complete':
      return 'Waiting for the technician to mark the job done.';
    case 'done':
      return 'Example finished. No message was sent.';
    default:
      return '';
  }
}

function renderStepIcon(name: AutoStep['iconName']) {
  switch (name) {
    case 'send':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M22 2 9 15m13-13-7 20-4-9-9-4z" />
        </svg>
      );
    case 'file':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 3h10l4 4v14H5zM14 3v5h5M9 13h6m-6 4h6" />
        </svg>
      );
    case 'bell':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
      );
    case 'calendar':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4m10-4v4M3 10h18" />
        </svg>
      );
    case 'wrench':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M14 6a5 5 0 0 0 6 6L9 23l-6-6L14 6ZM7 17l2 2" />
        </svg>
      );
    case 'check':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m4 12 5 5L20 6" />
        </svg>
      );
  }
}

export function ExampleAutomation() {
  const [phase, setPhase] = useState<AutoPhase>('idle');
  const [step, setStep] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [events, setEvents] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<{
    owner: NotificationItem[];
    customer: NotificationItem[];
  }>({
    owner: [],
    customer: [],
  });
  const [phone, setPhone] = useState<RecipientPhone>('owner');
  const [failOnce, setFailOnce] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingStepRef = useRef<number | null>(null);
  const failOnceRef = useRef<boolean>(false);
  failOnceRef.current = failOnce;

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const getStepDelay = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return 20;
    }
    return 680;
  }, []);

  const autoExecute = useCallback(
    (i: number) => {
      setStep(i);
      setSelected(i);
      pendingStepRef.current = null;

      // Simulated failure condition on step 2
      if (i === 2 && failOnceRef.current) {
        setPhase('failed');
        setFailOnce(false);
        failOnceRef.current = false;
        setEvents((prev) => [
          ...prev,
          'Owner alert failed',
        ]);
        return;
      }

      setDone((prev) => {
        const next = new Set(prev);
        next.add(i);
        return next;
      });

      if (i === 0) {
        setEvents((prev) => [...prev, 'Request received: Anita, tap repair']);
        setPhase('running');
        pendingStepRef.current = 1;
        timerRef.current = setTimeout(() => {
          autoExecute(1);
        }, getStepDelay());
        return;
      }

      if (i === 1) {
        setEvents((prev) => [...prev, 'Request saved']);
        setPhase('running');
        pendingStepRef.current = 2;
        timerRef.current = setTimeout(() => {
          autoExecute(2);
        }, getStepDelay());
        return;
      }

      if (i === 2) {
        setAlerts((prev) => ({
          ...prev,
          owner: [
            ...prev.owner,
            {
              title: 'New request',
              text: 'Anita needs a tap repair. She prefers Saturday morning.',
            },
          ],
        }));
        setEvents((prev) => [
          ...prev,
          'Owner alerted',
        ]);
        setPhone('owner');
        setPhase('await_confirm');
        return;
      }

      if (i === 3) {
        setAlerts((prev) => ({
          ...prev,
          customer: [
            ...prev.customer,
            {
              title: 'Visit confirmed',
              text: 'Your tap repair visit is confirmed for Saturday morning.',
            },
          ],
        }));
        setEvents((prev) => [
          ...prev,
          'Owner confirmed the visit. Customer told.',
        ]);
        setPhone('customer');
        setPhase('await_complete');
        return;
      }

      if (i === 4) {
        setAlerts((prev) => ({
          ...prev,
          owner: [
            ...prev.owner,
            {
              title: 'Job done',
              text: 'Anita’s tap repair was marked done by the technician.',
            },
          ],
        }));
        setEvents((prev) => [
          ...prev,
          'Technician marked the job done',
        ]);
        setPhase('running');
        pendingStepRef.current = 5;
        timerRef.current = setTimeout(() => {
          autoExecute(5);
        }, getStepDelay());
        return;
      }

      if (i === 5) {
        setAlerts((prev) => ({
          ...prev,
          customer: [
            ...prev.customer,
            {
              title: 'Job done',
              text: 'Your tap repair is marked as done. Thank you.',
            },
          ],
        }));
        setEvents((prev) => [
          ...prev,
          'Customer told the job is done',
        ]);
        setPhone('customer');
        setPhase('done');
      }
    },
    [getStepDelay]
  );

  const handleRun = useCallback(() => {
    stopTimer();
    setDone(new Set());
    setEvents([]);
    setAlerts({ owner: [], customer: [] });
    setPhone('owner');
    autoExecute(0);
  }, [stopTimer, autoExecute]);

  const handlePauseResume = useCallback(() => {
    if (phase === 'running') {
      stopTimer();
      setPhase('paused');
    } else if (phase === 'paused') {
      const nextStep = pendingStepRef.current ?? step;
      setPhase('running');
      timerRef.current = setTimeout(() => {
        autoExecute(nextStep);
      }, getStepDelay());
    }
  }, [phase, step, stopTimer, autoExecute, getStepDelay]);

  const handleReset = useCallback(() => {
    stopTimer();
    pendingStepRef.current = null;
    setPhase('idle');
    setStep(-1);
    setSelected(0);
    setDone(new Set());
    setEvents([]);
    setAlerts({ owner: [], customer: [] });
    setPhone('owner');
    setFailOnce(false);
  }, [stopTimer]);

  const handleConfirmVisit = useCallback(() => {
    if (phase !== 'await_confirm') return;
    autoExecute(3);
  }, [phase, autoExecute]);

  const handleMarkComplete = useCallback(() => {
    if (phase !== 'await_complete') return;
    autoExecute(4);
  }, [phase, autoExecute]);

  const handleRetry = useCallback(() => {
    if (phase !== 'failed') return;
    setPhase('running');
    setEvents((prev) => [...prev, 'Step retry initiated']);
    timerRef.current = setTimeout(() => {
      autoExecute(2);
    }, getStepDelay());
  }, [phase, autoExecute, getStepDelay]);

  const handleToggleFail = useCallback(() => {
    if (phase !== 'idle') return;
    setFailOnce((prev) => !prev);
  }, [phase]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const currentAlerts = alerts[phone];
  const latestAlert = currentAlerts.length > 0 ? currentAlerts[currentAlerts.length - 1] : null;

  return (
    <div className={styles.autoLayout} id="demo-automation">
      {/* Primary Device: Laptop Frame with Workflow Canvas */}
      <div className={`${styles.device} ${styles.laptopDevice}`} data-device="laptop">
        <div className={styles.hardware}>
          <div className={styles.productScreen}>
            <div className={styles.autoUi}>
              {/* Header */}
              <div className={styles.autoHeader}>
                <div>
                  <strong>Example Home Repairs · Workflows</strong>
                  <div className={styles.autoSubline}>
                    What happens after a request
                  </div>
                </div>
                <span className={styles.pChip}>Simulated</span>
              </div>

              {/* Controls Bar */}
              <div className={styles.autoControls}>
                <button
                  type="button"
                  className={styles.pPrimary}
                  onClick={handleRun}
                  disabled={phase !== 'idle' && phase !== 'done'}
                  data-action="auto-run"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Run example</span>
                </button>

                <button
                  type="button"
                  className={styles.pSecondary}
                  onClick={handlePauseResume}
                  disabled={phase !== 'running' && phase !== 'paused'}
                  data-action="auto-pause"
                >
                  {phase === 'paused' ? (
                    <>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      <span>Pause</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className={styles.pSecondary}
                  onClick={handleReset}
                  data-action="auto-reset"
                >
                  Start again
                </button>

                <span
                  className={styles.autoStatus}
                  id="auto-status"
                  role="status"
                  aria-live="polite"
                >
                  {formatAutoStatus(phase, step)}
                </span>
              </div>

              {/* Mobile Notification Preview Fallback */}
              <div
                className={styles.autoMobileBanners}
                aria-label="Mobile notification preview"
              >
                <div className={styles.autoMiniLabel}>
                  <span>Phone notification preview · 9:41</span>
                  <span>Simulated</span>
                </div>
                <div
                  className={styles.autoMiniSwitch}
                  role="group"
                  aria-label="Notification preview recipient"
                >
                  <button
                    type="button"
                    aria-pressed={phone === 'owner'}
                    onClick={() => setPhone('owner')}
                    data-action="auto-phone"
                    data-phone="owner"
                  >
                    Owner&apos;s phone
                  </button>
                  <button
                    type="button"
                    aria-pressed={phone === 'customer'}
                    onClick={() => setPhone('customer')}
                    data-action="auto-phone"
                    data-phone="customer"
                  >
                    Customer&apos;s phone
                  </button>
                </div>
                {latestAlert ? (
                  <div className={styles.autoMiniNote} role="status">
                    <strong>{latestAlert.title}</strong>
                    <span>{latestAlert.text}</span>
                  </div>
                ) : (
                  <div className={styles.autoEmpty}>
                    An alert will appear here after its step runs.
                  </div>
                )}
              </div>

              {/* Main Workflow Stage */}
              <div className={styles.autoMain}>
                <div className={styles.autoCanvas}>
                  <div className={styles.autoNodes}>
                    {AUTO_STEPS.map((s, i) => {
                      const status = getAutoStatus(i, phase, step, done);
                      const isSelected = selected === i;
                      return (
                        <button
                          key={s.title}
                          type="button"
                          className={styles.autoNode}
                          data-action="auto-select"
                          data-index={i}
                          data-status={status}
                          aria-pressed={isSelected}
                          onClick={() => setSelected(i)}
                        >
                          <span className={styles.nodeIcon}>
                            {renderStepIcon(s.iconName)}
                          </span>
                          <strong>{s.title}</strong>
                          <small>
                            {done.has(i)
                              ? 'Done'
                              : status === 'waiting'
                              ? 'Needs you'
                              : status === 'failed'
                              ? 'Failed'
                              : status === 'active'
                              ? 'Running'
                              : 'Waiting'}
                          </small>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Step Detail */}
                  <div className={styles.autoDetail} role="status" id="auto-detail">
                    <b>{AUTO_STEPS[selected].kind}:</b>{' '}
                    {AUTO_STEPS[selected].summary}
                  </div>
                </div>

                {/* Execution History */}
                <div className={styles.autoActivity} aria-label="History">
                  <h3>History</h3>
                  <ul>
                    {events.length > 0 ? (
                      events.map((ev, idx) => (
                        <li key={`${idx}-${ev}`}>{ev}</li>
                      ))
                    ) : (
                      <li>Nothing has run yet.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Human Action Gates Bar */}
              <div className={styles.autoHuman}>
                {phase === 'await_confirm' && (
                  <>
                    <button
                      type="button"
                      className={styles.pPrimary}
                      onClick={handleConfirmVisit}
                      data-action="auto-confirm"
                    >
                      Confirm visit
                    </button>
                    <small>The owner does this, not the system.</small>
                  </>
                )}

                {phase === 'await_complete' && (
                  <>
                    <button
                      type="button"
                      className={styles.pPrimary}
                      onClick={handleMarkComplete}
                      data-action="auto-complete"
                    >
                      Mark job done
                    </button>
                    <small>The technician does this, not the system.</small>
                  </>
                )}

                {phase === 'failed' && (
                  <>
                    <button
                      type="button"
                      className={styles.pPrimary}
                      onClick={handleRetry}
                      data-action="auto-retry"
                    >
                      Try that step again
                    </button>
                    <small>Nothing else runs until this step works.</small>
                  </>
                )}

                {phase !== 'await_confirm' &&
                  phase !== 'await_complete' &&
                  phase !== 'failed' && (
                    <small>Two steps wait for a person. You play both.</small>
                  )}

                <button
                  type="button"
                  className={styles.autoFailure}
                  onClick={handleToggleFail}
                  aria-pressed={failOnce}
                  disabled={phase !== 'idle'}
                  data-action="auto-fail"
                >
                  {failOnce ? '✓ ' : ''}Show what happens when a step fails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companion Device: Phone Frame for Simulated Lock-Screen Push Notifications */}
      <div className={styles.autoNotifier}>
        <div
          className={styles.autoPhoneSwitch}
          role="group"
          aria-label="Simulated notification recipient"
        >
          <button
            type="button"
            aria-pressed={phone === 'owner'}
            onClick={() => setPhone('owner')}
            data-action="auto-phone"
            data-phone="owner"
          >
            Owner&apos;s phone
          </button>
          <button
            type="button"
            aria-pressed={phone === 'customer'}
            onClick={() => setPhone('customer')}
            data-action="auto-phone"
            data-phone="customer"
          >
            Customer&apos;s phone
          </button>
        </div>

        <div
          className={styles.lockscreen}
          role="region"
          aria-label={`Simulated ${
            phone === 'owner' ? 'owner' : 'customer'
          } lock-screen notifications`}
        >
          <div className={styles.lockclock}>
            <strong>9:41</strong>
            <small>Now</small>
          </div>

          <div aria-live="polite" className={styles.notificationList}>
            {currentAlerts.length > 0 ? (
              currentAlerts.map((n, idx) => (
                <div
                  key={`${idx}-${n.title}`}
                  className={`${styles.notification} ${
                    idx === currentAlerts.length - 1
                      ? styles.notificationNew
                      : ''
                  }`}
                >
                  <small>Example Home Repairs · Now</small>
                  <strong>{n.title}</strong>
                  <p>{n.text}</p>
                </div>
              ))
            ) : (
              <p className={styles.lockempty}>
                Alerts appear here as the example runs.
              </p>
            )}
          </div>

          <div className={styles.lockfoot} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
