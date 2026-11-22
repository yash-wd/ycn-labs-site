'use client';

import React, { useState } from 'react';
import { ExamplePhoneFrame } from './ExampleDeviceFrames';
import styles from './ExampleDemos.module.css';

const APP_SERVICES = ['Tap repair', 'Wiring check', 'Wall painting'];
const DAYS = ['Saturday', 'Sunday', 'Monday'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];

export function ExampleWebApp() {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!selectedService) {
        setError('Please choose a service.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDay || !selectedTime) {
        setError('Please pick a preferred day and time.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setIsDone(true);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService('');
    setSelectedDay('');
    setSelectedTime('');
    setIsDone(false);
    setError('');
  };

  const progressPercent = isDone ? 100 : (step / 3) * 100;

  return (
    <ExamplePhoneFrame>
      <div className={styles.appUi}>
        {/* Header */}
        <header className={styles.appHead}>
          <strong>Example Home Repairs</strong>
          <small>Request a visit</small>
          <div className={styles.appProgress} aria-hidden="true">
            <span
              className={styles.appProgressTrack}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </header>

        {/* Main Body */}
        <div className={styles.appMain} id="app-main" tabIndex={-1}>
          {isDone ? (
            <div style={{ textAlign: 'center', padding: '15px 0' }}>
              {/* Checkmark icon */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#176747"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ margin: '0 auto 12px' }}
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="12" cy="12" r="10" stroke="#176747" fill="#eaf9f2" />
                <polyline points="8 12 11 15 16 9" />
              </svg>
              <h2>Demo result</h2>
              <p>Nothing was submitted.</p>
              <div className={styles.pResult} style={{ marginTop: '22px', textAlign: 'left' }}>
                Example reference: <b>EXAMPLE-001</b>.
                <br />
                In a real system, the business would then confirm a time.
              </div>
              <button
                type="button"
                className={styles.pPrimary}
                style={{ marginTop: '21px' }}
                onClick={handleReset}
              >
                Start again
              </button>
            </div>
          ) : step === 1 ? (
            <div>
              <span className={styles.pKicker}>STEP 1 OF 3</span>
              <h2>What do you need?</h2>
              <p>Choose one service.</p>
              <div style={{ marginTop: '22px' }}>
                {APP_SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.appChoice}
                    onClick={() => {
                      setSelectedService(s);
                      setError('');
                    }}
                    aria-pressed={selectedService === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              <span className={styles.pKicker}>STEP 2 OF 3</span>
              <h2>When suits you?</h2>
              <p>Pick a preferred day and time. The business confirms the final time later.</p>
              <div style={{ marginTop: '18px' }}>
                <b className={styles.pFieldLabel}>Preferred day</b>
                <div className={styles.appGrid}>
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={styles.appChoice}
                      onClick={() => {
                        setSelectedDay(d);
                        setError('');
                      }}
                      aria-pressed={selectedDay === d}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <b className={styles.pFieldLabel}>Preferred time</b>
                <div className={styles.appGrid}>
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={styles.appChoice}
                      onClick={() => {
                        setSelectedTime(t);
                        setError('');
                      }}
                      aria-pressed={selectedTime === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span className={styles.pKicker}>STEP 3 OF 3</span>
              <h2>Check your request</h2>
              <p>Check the details, then send.</p>
              <dl className={styles.appReview}>
                <div>
                  <dt>Name</dt>
                  <dd>Anita (sample)</dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{selectedService}</dd>
                </div>
                <div>
                  <dt>Preferred day</dt>
                  <dd>{selectedDay}</dd>
                </div>
                <div>
                  <dt>Preferred time</dt>
                  <dd>{selectedTime}</dd>
                </div>
              </dl>
              <button
                type="button"
                className={styles.pLink}
                onClick={() => setStep(1)}
              >
                Change
              </button>
            </div>
          )}

          {!isDone && (
            <>
              <div className={styles.appActions}>
                {step > 1 && (
                  <button
                    type="button"
                    className={styles.pSecondary}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  className={styles.pPrimary}
                  onClick={handleNext}
                >
                  {step === 3 ? 'Send request (demo)' : 'Continue'}
                </button>
              </div>
              {error && (
                <div className={styles.appError} role="alert">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className={styles.appFooter}>
          Sample customer. Nothing you choose is collected.
        </footer>
      </div>
    </ExamplePhoneFrame>
  );
}
