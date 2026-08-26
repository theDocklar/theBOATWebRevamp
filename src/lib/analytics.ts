"use client";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Send a custom GA4 event from the client
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track conversion events (e.g. contact form submissions, discovery call clicks)
 */
export function trackConversion(conversionName: string, details?: Record<string, unknown>) {
  trackEvent(conversionName, {
    event_category: "conversion",
    ...details,
  });
}

/**
 * Track button or link interactions
 */
export function trackInteraction(elementName: string, location?: string) {
  trackEvent("interaction_click", {
    element: elementName,
    location: location || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}
