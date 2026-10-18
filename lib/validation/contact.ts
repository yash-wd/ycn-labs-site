import { z } from "zod";

export const BUDGET_OPTIONS = [
  "Under £5,000",
  "£5,000 – £15,000",
  "£15,000 – £30,000",
  "£30,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP (within 1 month)",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
  "Not sure yet",
] as const;

export const PROJECT_TYPES = [
  "Website or digital presence",
  "Web application or workflow tool",
  "Business system or integration",
  "Software product or platform",
  "General consultation or other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  projectType: z.string().trim().min(1, "Please select a project type"),
  budget: z.string().trim().optional().or(z.literal("")),
  timeline: z.string().trim().optional().or(z.literal("")),
  preferredContactMethod: z
    .string()
    .trim()
    .max(50, "Preferred contact method must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  idempotencyKey: z
    .string()
    .trim()
    .max(100, "Idempotency key must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
