type EmailPayload = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(payload: EmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email:fallback]", payload);
    return { ok: true, skipped: true };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@example.com",
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
  });
  return { ok: true, skipped: false };
}
