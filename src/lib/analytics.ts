// Analytics placeholder: events are pushed to window.dataLayer and logged.
// Connect GA4 / GTM later without changing call sites.
export type CreditEvent =
  | "credit_landing_view"
  | "credit_quiz_start"
  | "credit_quiz_complete"
  | "credit_inventory_view"
  | "credit_vehicle_click"
  | "credit_dealer_contact"
  | "credit_faq_open"
  | "credit_cta_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: CreditEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (import.meta.env.DEV) console.debug("[analytics]", event, params);
}
