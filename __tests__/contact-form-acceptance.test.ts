import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { evaluateContactResponse, IMPROVEMENT_GOALS } from "@/components/ContactForm";

describe("ContactForm: improvement goal values (Task 10b)", () => {
  // Each goal button submits goal.value as projectType (setValue("projectType", goal.value)).
  // This suite has no DOM, so it checks the value the button submits, not a simulated click.
  it("'Build a product' submits the web-application value and keeps its visible label", () => {
    const buildProduct = IMPROVEMENT_GOALS.find((goal) => goal.id === "build-product");
    expect(buildProduct?.label).toBe("Build a product");
    expect(buildProduct?.value).toBe("Build a software product (web application)");
    for (const goal of IMPROVEMENT_GOALS) {
      expect(`${goal.label} ${goal.value}`).not.toMatch(/mobile|saas/i);
    }
  });
});

describe("ContactForm: Acceptance Boundary & Anti-Bot Receipt Protection", () => {
  it("shows success receipt when success: true and data.accepted: true", () => {
    const validAcceptedResponse = {
      success: true,
      data: {
        message: "We received your request.",
        leadId: "lead_12345",
        accepted: true,
        acknowledgementSent: true,
      },
      requestId: "req_test_001",
    };

    const result = evaluateContactResponse(true, validAcceptedResponse);

    expect(result.shouldShowSuccess).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it("NEVER displays genuine acceptance receipt when success: true but data.accepted: false (honeypot/bot)", () => {
    const honeypotResponse = {
      success: true,
      data: {
        processed: true,
        accepted: false,
      },
      requestId: "req_test_bot",
    };

    const result = evaluateContactResponse(true, honeypotResponse);

    expect(result.shouldShowSuccess).toBe(false);
    expect(result.errorMessage).toBe(
      "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route."
    );
  });

  it("rejects response when data.accepted is missing or not strictly boolean true", () => {
    const missingAcceptedResponse = {
      success: true,
      data: {
        leadId: "lead_partial",
      },
      requestId: "req_test_partial",
    };

    const result = evaluateContactResponse(true, missingAcceptedResponse);
    expect(result.shouldShowSuccess).toBe(false);

    const falsyAcceptedResponse = {
      success: true,
      data: {
        accepted: null,
      },
    };
    expect(evaluateContactResponse(true, falsyAcceptedResponse).shouldShowSuccess).toBe(false);
  });

  it("rejects response when HTTP status is not OK (e.g. 503 SERVICE_UNAVAILABLE)", () => {
    const error503Response = {
      success: false,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message:
          "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route.",
      },
      requestId: "req_err_503",
    };

    const result = evaluateContactResponse(false, error503Response);

    expect(result.shouldShowSuccess).toBe(false);
    expect(result.errorMessage).toContain("We could not accept your request safely");
  });

  it("rejects response when HTTP status is 400 INVALID_INPUT with custom field error message", () => {
    const error400Response = {
      success: false,
      error: {
        code: "INVALID_INPUT",
        message: "Check the highlighted details and try again.",
      },
      requestId: "req_err_400",
    };

    const result = evaluateContactResponse(false, error400Response);

    expect(result.shouldShowSuccess).toBe(false);
    expect(result.errorMessage).toBe("Check the highlighted details and try again.");
  });

  it("rejects response when HTTP status is 429 RATE_LIMITED", () => {
    const error429Response = {
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please try again later.",
      },
      requestId: "req_err_429",
    };

    const result = evaluateContactResponse(false, error429Response);

    expect(result.shouldShowSuccess).toBe(false);
    expect(result.errorMessage).toBe("Too many requests. Please try again later.");
  });

  it("contract: ContactForm source code strictly requires data.accepted === true", () => {
    const formSource = fs.readFileSync(
      path.join(process.cwd(), "components", "ContactForm.tsx"),
      "utf-8"
    );

    // Verify evaluateContactResponse requires data?.accepted !== true before allowing success
    expect(formSource).toContain("resData?.data?.accepted !== true");
    expect(formSource).toContain("evaluateContactResponse");
    expect(formSource).toContain("if (!evaluation.shouldShowSuccess)");
  });
});
