'use client';

import React, { useState } from 'react';
import styles from './ExampleDemos.module.css';

export interface Lesson {
  title: string;
  body: string;
  tip: string;
}

export const LEARNING_LESSONS: Lesson[] = [
  {
    title: 'Parts of a computer',
    body: 'A computer includes a screen, keyboard, mouse and the parts that run programs. Each has a job.',
    tip: 'Try spotting the keyboard, screen and mouse next time you use a computer.',
  },
  {
    title: 'Using a keyboard and mouse',
    body: 'Use the mouse to point and select. The keyboard lets you type letters, spaces and commands.',
    tip: 'Practice typing a short sentence and adding spaces between words.',
  },
  {
    title: 'Saving your work',
    body: 'Save a file with a clear name. Choose a folder you can find again and check the saved file.',
    tip: 'Practice choosing a filename that describes its contents.',
  },
];

export const QUIZ_OPTIONS = ['Space bar', 'Enter', 'Shift'] as const;

export function ExampleLearning() {
  const [view, setView] = useState<'My courses' | 'Progress'>('My courses');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [quizChoice, setQuizChoice] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<string>('');
  const [quizCorrect, setQuizCorrect] = useState<boolean>(false);

  const completedCount = completedLessons.size;
  const currentLesson = LEARNING_LESSONS[selectedLesson];
  const isCourseComplete = completedCount === LEARNING_LESSONS.length && quizCorrect;

  const handleToggleComplete = () => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(selectedLesson)) {
        next.delete(selectedLesson);
      } else {
        next.add(selectedLesson);
      }
      return next;
    });
  };

  const handleQuizChoiceChange = (opt: string) => {
    setQuizChoice(opt);
    setQuizResult('');
    setQuizCorrect(false);
  };

  const handleQuizCheck = () => {
    if (!quizChoice) {
      setQuizResult('Choose an answer.');
      setQuizCorrect(false);
    } else if (quizChoice === 'Space bar') {
      setQuizResult('Correct.');
      setQuizCorrect(true);
    } else {
      setQuizResult('Not quite. Try again.');
      setQuizCorrect(false);
    }
  };

  const handleReset = () => {
    setView('My courses');
    setSelectedLesson(0);
    setCompletedLessons(new Set());
    setQuizChoice(null);
    setQuizResult('');
    setQuizCorrect(false);
  };

  return (
    <div className={`${styles.device} ${styles.tabletDevice} ${styles.learnDevice}`}>
      <div className={styles.hardware}>
        <div className={styles.productScreen}>
          <div className={styles.learnUi}>
            {/* Desktop Sidebar Navigation */}
            <aside className={styles.learnSidebar}>
              <strong>
                Example Learning Hub
                <br />
                <small className={styles.learnSubhead}>Student workspace</small>
              </strong>
              <div className={styles.learnNavList}>
                {(['My courses', 'Progress'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    data-action="learn-view"
                    data-view={v}
                    aria-pressed={view === v}
                    className={view === v ? styles.learnNavActive : styles.learnNavInactive}
                    onClick={() => setView(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </aside>

            {/* Mobile Navigation Header */}
            <nav className={styles.learnMobileNav} aria-label="Learning platform views">
              {(['My courses', 'Progress'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  data-action="learn-view"
                  data-view={v}
                  aria-pressed={view === v}
                  className={view === v ? styles.learnMobileActive : styles.learnMobileInactive}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </nav>

            {/* Main Learning Content Area */}
            <div className={styles.learnContent}>
              {/* Header Bar */}
              <div className={styles.learnTop}>
                <div>
                  <h2>{view}</h2>
                  <span className={styles.learnMuted}>Sample student · Fictional learning centre</span>
                </div>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  data-action="learn-reset"
                  onClick={handleReset}
                >
                  Start again
                </button>
              </div>

              <div className={styles.learnMain}>
                {/* Course Banner */}
                <div className={styles.learnCourse}>
                  <div>
                    <span className={styles.learnKicker}>COURSE · COMPUTER BASICS</span>
                    <h3>Learn everyday computer skills.</h3>
                    <p>Three short sample lessons and a practice question.</p>
                  </div>
                  <div className={styles.learnCourseArt} aria-hidden="true">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.65"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                      <path d="M6 2v20" />
                    </svg>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.learnProgress}>
                  <strong>{completedCount} of 3 lessons complete</strong>
                  <div
                    className={styles.learnProgressTrack}
                    role="progressbar"
                    aria-valuenow={completedCount}
                    aria-valuemin={0}
                    aria-valuemax={3}
                    aria-label={`Lesson progress ${completedCount} of 3`}
                  >
                    <span style={{ width: `${(completedCount / 3) * 100}%` }} />
                  </div>
                </div>

                {/* View Conditional Section */}
                {view === 'My courses' ? (
                  <div className={styles.learnLessons}>
                    <div className={styles.learnList}>
                      <h3>Lessons</h3>
                      {LEARNING_LESSONS.map((l, i) => (
                        <button
                          key={l.title}
                          type="button"
                          className={styles.learnLessonBtn}
                          data-action="learn-lesson"
                          data-index={i}
                          aria-pressed={i === selectedLesson}
                          onClick={() => setSelectedLesson(i)}
                        >
                          <span>
                            {i + 1}. {l.title}
                          </span>
                          <span>{completedLessons.has(i) ? '✓' : ''}</span>
                        </button>
                      ))}
                    </div>

                    <div className={styles.learnLesson}>
                      <span className={styles.learnKicker}>LESSON {selectedLesson + 1} OF 3</span>
                      <h3>{currentLesson.title}</h3>
                      <p>{currentLesson.body}</p>
                      <div className={styles.learnTipPanel}>{currentLesson.tip}</div>
                      <button
                        type="button"
                        className={styles.primaryBtn}
                        data-action="learn-complete"
                        onClick={handleToggleComplete}
                      >
                        {completedLessons.has(selectedLesson)
                          ? 'Lesson completed ✓'
                          : 'Mark lesson as complete'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.progressSummaryPanel}>
                    <h3>Progress</h3>
                    <p className={styles.learnMuted}>
                      {completedCount} completed sample lessons. Quiz:{' '}
                      {quizCorrect ? 'correct' : 'not completed'}.
                    </p>
                  </div>
                )}

                {/* Interactive Short Quiz */}
                <div className={styles.learnQuiz}>
                  <h3>Short quiz</h3>
                  <p className={styles.learnMuted}>Which key adds a space between words?</p>
                  <div
                    className={styles.quizRadioGroup}
                    role="radiogroup"
                    aria-label="Sample quiz answer"
                  >
                    {QUIZ_OPTIONS.map((opt) => (
                      <label key={opt} className={styles.quizLabel}>
                        <input
                          type="radio"
                          name="lesson-quiz"
                          value={opt}
                          checked={quizChoice === opt}
                          onChange={() => handleQuizChoiceChange(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    data-action="learn-quiz-check"
                    style={{ marginTop: '11px' }}
                    onClick={handleQuizCheck}
                  >
                    Check answer
                  </button>
                  <p className={styles.learnMuted} id="learn-quiz-result" role="status" style={{ marginTop: '8px' }}>
                    {quizResult}
                  </p>
                </div>

                {/* Completion Banner */}
                {isCourseComplete && (
                  <div className={styles.learnComplete} role="status">
                    <strong>Course complete (sample)</strong>
                    <p>This is a sample record, not a real certificate or qualification.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
