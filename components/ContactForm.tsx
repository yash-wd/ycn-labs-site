"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/validation/contact";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const IMPROVEMENT_GOALS = [
  { id: "get-found", label: "Get found", value: "Help customers find my business (Websites & presence)" },
  { id: "enquiries-bookings", label: "Enquiries/bookings/orders", value: "Make enquiries, bookings or orders easier (Customer journeys)" },
  { id: "manual-work", label: "Less manual work", value: "Reduce repetitive work (Business systems & automation)" },
  { id: "build-product", label: "Build a product", value: "Build a software product (Web, mobile or SaaS)" },
  { id: "something-else", label: "Something else", value: "Custom software / Specific operational system" },
  { id: "not-sure", label: "Not sure", value: "Not sure yet — need guidance on the right digital format" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Split inputs for "What happens today?" and "What would you like to change?"
  const [whatHappensToday, setWhatHappensToday] = useState("");
  const [whatToChange, setWhatToChange] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: IMPROVEMENT_GOALS[0].value,
      budget: "Not sure yet",
      timeline: "Not sure yet",
      message: "",
      honeypot: "",
    },
  });

  const selectedGoal = watch("projectType");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Compose message from the two problem-first free text fields if provided
    let combinedMessage = data.message || "";
    if (whatHappensToday.trim() || whatToChange.trim()) {
      combinedMessage = [
        whatHappensToday.trim() ? `What happens today:\n${whatHappensToday.trim()}` : "",
        whatToChange.trim() ? `What we want to change:\n${whatToChange.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
    }

    const payload = {
      ...data,
      message: combinedMessage.length >= 10 ? combinedMessage : (data.message || combinedMessage),
    };

    if (payload.message.length < 10) {
      setSubmitError("Check the highlighted details and try again. Please provide a brief description (at least 10 characters).");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(
          resData.error?.message || "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route."
        );
      }

      setSubmitSuccess(true);
      reset();
      setWhatHappensToday("");
      setWhatToChange("");
    } catch (err: any) {
      setSubmitError(
        err.message || "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
          We received your request.
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
          We will review your operational details and get back to you with structured preliminary thoughts on scope and technical approach.
        </p>
        <button
          type="button"
          onClick={() => setSubmitSuccess(false)}
          className="text-xs font-semibold text-[var(--action-blue)] hover:underline pt-2 inline-block cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Honeypot field (hidden from legitimate users) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        {...register("honeypot")}
      />

      {submitError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-rose-300">Temporary failure</p>
            <p className="text-xs leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      {/* 1. What would you like to improve? */}
      <div className="space-y-3">
        <label className="block text-[13px] font-semibold text-[var(--text-primary)] font-sans">
          1. What would you like to improve? *
        </label>
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-2.5">
          {IMPROVEMENT_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.value;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setValue("projectType", goal.value, { shouldValidate: true })}
                className={`p-3 rounded-xl border text-left text-[13px] font-medium leading-snug transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "border-[var(--action-blue)] bg-[var(--action-blue)]/10 text-[var(--action-blue)] shadow-xs"
                    : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="break-words">{goal.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-blue)] shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register("projectType")} />
        {errors.projectType && (
          <p className="text-xs text-rose-400">{errors.projectType.message}</p>
        )}
      </div>

      {/* 2. What happens today? & 3. What would you like to change? */}
      <div className="space-y-4">
        <div>
          <label htmlFor="whatHappensToday" className="block text-[13px] font-semibold text-[var(--text-primary)] font-sans mb-1.5">
            2. What happens today? (Free text)
          </label>
          <textarea
            id="whatHappensToday"
            rows={3}
            value={whatHappensToday}
            onChange={(e) => {
              setWhatHappensToday(e.target.value);
              setValue("message", `${e.target.value}\n\n${whatToChange}`, { shouldValidate: true });
            }}
            placeholder="Tell us what is slow, lost, manual, or painful in your day-to-day operations..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--action-blue)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="whatToChange" className="block text-[13px] font-semibold text-[var(--text-primary)] font-sans mb-1.5">
            3. What would you like to change? (Free text) *
          </label>
          <textarea
            id="whatToChange"
            rows={3}
            value={whatToChange}
            onChange={(e) => {
              setWhatToChange(e.target.value);
              setValue("message", `${whatHappensToday}\n\n${e.target.value}`, { shouldValidate: true });
            }}
            placeholder="What outcome or system would make a concrete difference to your customers or team?"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--action-blue)] focus:outline-none transition-colors"
          />
          <input type="hidden" {...register("message")} />
          {errors.message && (
            <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* 4. How should we contact you? */}
      <div className="space-y-3">
        <label className="block text-[13px] font-semibold text-[var(--text-primary)] font-sans">
          4. How should we contact you? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Your name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full name"
              {...register("name")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-sans bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--action-blue)] focus:outline-none transition-colors ${
                errors.name ? "border-rose-500/50" : "border-[var(--border-subtle)]"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Email address *
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              {...register("email")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-sans bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--action-blue)] focus:outline-none transition-colors ${
                errors.email ? "border-rose-500/50" : "border-[var(--border-subtle)]"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
            Company or organization (optional)
          </label>
          <input
            id="company"
            type="text"
            placeholder="Your business name"
            {...register("company")}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--action-blue)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* 5. Optional planning information */}
      <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
        <label className="block text-[13px] font-semibold text-[var(--text-muted)] font-sans">
          5. Optional planning information
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Approximate budget range (optional)
            </label>
            <select
              id="budget"
              {...register("budget")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm font-sans text-[var(--text-primary)] focus:border-[var(--action-blue)] focus:outline-none transition-colors"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Target timeline (optional)
            </label>
            <select
              id="timeline"
              {...register("timeline")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm font-sans text-[var(--text-primary)] focus:border-[var(--action-blue)] focus:outline-none transition-colors"
            >
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] font-semibold text-sm normal-case tracking-[0.01em] shadow-xs transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[44px] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending your request…</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send project enquiry</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-[var(--text-muted)] mt-2.5">
          We respect your privacy. No data is shared or sold.
        </p>
      </div>
    </form>
  );
}
