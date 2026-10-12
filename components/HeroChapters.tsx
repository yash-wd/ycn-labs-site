"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Media } from "@/components/Media";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Search,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Chapter {
  id: number;
  title: string;
  tagline: string;
  label: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  poster?: string;
  caption: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "We build around your business.",
    tagline: "Help customers find you, ask, book or buy. Keep the work behind it organised.",
    label: "Foundation",
    mediaType: "image",
    mediaSrc: "/media/small_business_proprietor_counter.jpg",
    caption: "A business proprietor at the service counter ready to welcome clients.",
  },
  {
    id: 2,
    title: "Customers find you.",
    tagline: "A clear offering shown clearly on phones and computers.",
    label: "Discovery",
    mediaType: "video",
    mediaSrc: "/media/clip1_hands_using_smartphone_6s.mp4",
    poster: "/media/customer_hand_holding_smartphone.jpg",
    caption: "A client discovering a local business offering on a smartphone.",
  },
  {
    id: 3,
    title: "They ask, book or buy.",
    tagline: "Let customers send an enquiry, request a time or place an order without phone tag.",
    label: "Customer Action",
    mediaType: "image",
    mediaSrc: "/media/hand_smartphone_finger_interaction.jpg",
    caption: "A client choosing a service time directly on their mobile device.",
  },
  {
    id: 4,
    title: "Your team sees it in one place.",
    tagline: "Enquiries arrive directly on your business screen ready for the next step.",
    label: "Business Operations",
    mediaType: "video",
    mediaSrc: "/media/clip2_person_working_laptop_6s.mp4",
    poster: "/media/person_working_receiving_laptop.jpg",
    caption: "Incoming customer requests appearing on the manager's laptop dashboard.",
  },
  {
    id: 5,
    title: "Built with the future in mind.",
    tagline: "Clear to use today, with support and future changes considered from the start.",
    label: "Long-term Peace of Mind",
    mediaType: "image",
    mediaSrc: "/media/clean_organised_laptop_desk.jpg",
    caption: "A calm, organised workspace running smoothly day after day.",
  },
];

const SEARCH_MAPPINGS: { keywords: string[]; actionId: string; title: string }[] = [
  { keywords: ["find", "website", "google", "presence", "search", "reach"], actionId: "find", title: "Help customers find me" },
  { keywords: ["ask", "enquiry", "message", "question", "contact", "chat"], actionId: "ask", title: "Let customers ask" },
  { keywords: ["time", "booking", "calendar", "schedule", "appointment"], actionId: "time", title: "Let them choose a time" },
  { keywords: ["buy", "order", "shop", "checkout", "store", "product"], actionId: "buy", title: "Take orders online" },
  { keywords: ["price", "quote", "estimate", "cost", "rates", "pricing"], actionId: "price", title: "Let them ask for a price" },
  { keywords: ["team", "organise", "jobs", "tasks", "dashboard", "staff"], actionId: "team", title: "Keep my team organised" },
];

export function HeroChapters() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsAutoPlaying(false);
    }
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsAutoPlaying(false);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Stop auto play on user manual interaction
  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    setProgress(0);
  }, []);

  const goToChapter = useCallback(
    (index: number) => {
      const targetIndex = (index + CHAPTERS.length) % CHAPTERS.length;
      setActiveChapterIndex(targetIndex);
      startTimeRef.current = Date.now();
      setProgress(0);
    },
    []
  );

  const nextChapter = useCallback(() => {
    goToChapter(activeChapterIndex + 1);
  }, [activeChapterIndex, goToChapter]);

  const prevChapter = useCallback(() => {
    goToChapter(activeChapterIndex - 1);
  }, [activeChapterIndex, goToChapter]);

  // Idle 6-second auto-advance progress loop
  useEffect(() => {
    if (!isAutoPlaying || isReducedMotion) {
      setProgress(0);
      return;
    }

    const DURATION_MS = 6000;
    startTimeRef.current = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(currentProgress);

      if (elapsed >= DURATION_MS) {
        goToChapter(activeChapterIndex + 1);
      } else {
        progressAnimRef.current = requestAnimationFrame(frame);
      }
    };

    progressAnimRef.current = requestAnimationFrame(frame);

    return () => {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [activeChapterIndex, isAutoPlaying, isReducedMotion, goToChapter]);

  // GSAP ScrollTrigger integration
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Pause auto play if user has scrolled
          if (self.progress > 0.05 && self.progress < 0.95) {
            stopAutoPlay();
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion, stopAutoPlay]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    stopAutoPlay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    const SWIPE_THRESHOLD = 50;
    if (deltaX > SWIPE_THRESHOLD) {
      prevChapter();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      nextChapter();
    }
  };

  // Needs Finder Search Form Handler
  const handleSearchSubmit = (e?: React.FormEvent, directTerm?: string) => {
    if (e) e.preventDefault();
    const query = (directTerm || searchQuery).trim().toLowerCase();
    if (!query) return;

    // Match keywords
    let matchedActionId = "find";
    let matchedTitle = "Help customers find me";

    for (const mapping of SEARCH_MAPPINGS) {
      if (mapping.keywords.some((k) => query.includes(k))) {
        matchedActionId = mapping.actionId;
        matchedTitle = mapping.title;
        break;
      }
    }

    setSearchFeedback(`Selected: ${matchedTitle}`);
    stopAutoPlay();

    // Dispatch selection event to UniversalActions component
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ycn-select-action", { detail: matchedActionId })
      );
      const targetElement = document.getElementById("actions-section");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0D111A] text-white selection:bg-[var(--action-blue)] selection:text-[var(--text-on-action)]"
    >
      {/* 1. Permanent Main Headline & Offer Introduction Area */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800/60">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--signal-cyan)] dark:text-[var(--action-blue)] mb-3">
            Built for real businesses
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Websites and software.
            <br />
            <span className="text-slate-300">Built around your business.</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Help customers find you, ask, book or buy. Keep the work behind it organised.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] text-sm font-semibold tracking-wider transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              Tell us what you need
            </Link>
            <Link
              href="/what-we-build"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span>See what we build</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Frontify-Inspired Needs Finder Search-Style Field */}
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#141C2B] border border-slate-800 shadow-xl max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              What would you like to make easier?
            </p>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. bookings, price quote, online orders, organise team..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D111A] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[var(--action-blue)] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[var(--action-blue)] text-[var(--text-on-action)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
              >
                Find
              </button>
            </form>

            {/* Quick Action Selection Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500">Popular:</span>
              {[
                { label: "Find me", term: "find" },
                { label: "Bookings", term: "booking" },
                { label: "Take orders", term: "order" },
                { label: "Price quote", term: "price" },
                { label: "Organise team", term: "team" },
              ].map((chip) => (
                <button
                  key={chip.term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(chip.label);
                    handleSearchSubmit(undefined, chip.term);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {searchFeedback && (
              <p className="text-xs text-[var(--action-blue)] mt-2 font-medium">
                {searchFeedback} → Jumped to action below
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. Five Visual Chapters Stage (Full Viewport Height) */}
      <section
        className="relative w-full min-h-[600px] h-[75vh] sm:h-[82vh] max-h-[900px] overflow-hidden flex items-center justify-center bg-[#0A0D14]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Story Chapters Showcase"
      >
        {/* Background Visual Layer with Transition */}
        {CHAPTERS.map((chapter, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <div
              key={chapter.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Media Container */}
              <div className="relative w-full h-full">
                <Media
                  src={chapter.mediaSrc}
                  type={chapter.mediaType}
                  poster={chapter.poster}
                  alt={chapter.title}
                  priority={idx === 0}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D111A] via-[#0D111A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D111A]/80 via-transparent to-[#0D111A]/60" />
              </div>

              {/* Foreground Chapter Content Overlay */}
              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
                <div className="max-w-xl pointer-events-auto bg-[#0D111A]/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--action-blue)]">
                      0{chapter.id} / 05
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                      {chapter.label}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {chapter.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {chapter.tagline}
                  </p>
                  <p className="mt-3 text-xs text-slate-500 italic">
                    {chapter.caption}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Right Side Chapter Index Pills (Honda Pattern) */}
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
          {CHAPTERS.map((ch, idx) => {
            const isCurrent = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  goToChapter(idx);
                  stopAutoPlay();
                }}
                className="group flex items-center gap-3 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-md p-1"
                aria-label={`Jump to chapter ${ch.id}: ${ch.title}`}
              >
                <span
                  className={`text-xs font-mono transition-all duration-200 ${
                    isCurrent
                      ? "text-white font-bold opacity-100 translate-x-0"
                      : "text-slate-400 opacity-0 group-hover:opacity-100 translate-x-1"
                  }`}
                >
                  {ch.label}
                </span>
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "w-8 bg-[var(--action-blue)]"
                      : "w-2.5 bg-slate-700 group-hover:bg-slate-500"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Controller Bar: Previous, Next, Play/Pause & Thin Progress Bar */}
        <div className="absolute bottom-4 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-[#0D111A]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                prevChapter();
                stopAutoPlay();
              }}
              aria-label="Previous chapter"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-slate-300 px-1">
              0{activeChapterIndex + 1} / 05
            </span>

            <button
              onClick={() => {
                nextChapter();
                stopAutoPlay();
              }}
              aria-label="Next chapter"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              onClick={() => {
                if (isAutoPlaying) {
                  stopAutoPlay();
                } else {
                  setIsAutoPlaying(true);
                  startTimeRef.current = Date.now();
                }
              }}
              aria-label={isAutoPlaying ? "Pause chapter tour" : "Play chapter tour"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Thin 6s Progress Bar (stops on reduced-motion or paused) */}
          {!isReducedMotion && isAutoPlaying && (
            <div className="hidden sm:block w-48 h-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-[var(--action-blue)] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
