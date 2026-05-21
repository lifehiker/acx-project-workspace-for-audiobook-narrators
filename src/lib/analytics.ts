export type AnalyticsEvent =
  | "template_download"
  | "signup_started"
  | "project_created"
  | "pronunciation_added"
  | "pickup_created"
  | "trial_started"
  | "checkout_completed";

export function track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  console.log("[analytics]", event, properties ?? {});
}
