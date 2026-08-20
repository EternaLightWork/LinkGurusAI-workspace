"use client";

import { useRef, useState } from "react";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Checkbox, ErrorSummary, Field, Honeypot } from "./form-fields";
import { Button } from "./primitives";

type FieldError = { field: string; message: string };

const COPY: Record<Locale, { consent: string; submit: string; done: string }> = {
  ar: {
    consent: "أوافق على تلقّي النشرة التنفيذية من لينك جوروز، وأعلم أنني أستطيع إلغاء الاشتراك في أي وقت.",
    submit: "اشترك",
    done: "إن كان هذا العنوان قادراً على استقبال البريد، فستصلك رسالة تأكيد. لا يبدأ الاشتراك قبل تأكيدك.",
  },
  en: {
    consent:
      "I agree to receive the Linkgurus Briefings and understand I can unsubscribe at any time.",
    submit: "Subscribe",
    done: "If that address can receive mail, a confirmation message is on its way. The subscription does not start until you confirm.",
  },
};

/** Spec 4.2 BriefingForm / 5.18. Double opt-in, explicit unchecked consent. */
export function BriefingForm({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = COPY[locale];
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorFor = (field: string) =>
    errors.find((e) => e.field === field)?.message.split(" — ").pop();

  if (submitted) {
    return (
      <div role="status" className="border-s-2 border-blue-500 bg-blue-50 p-5">
        <p className="max-w-[60ch]">{t.done}</p>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    const found: FieldError[] = [];
    if (!email) found.push({ field: "brief-email", message: `${c.ui.emailLabel} — ${c.ui.requiredField}` });
    else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email))
      found.push({ field: "brief-email", message: `${c.ui.emailLabel} — ${c.ui.invalidEmail}` });
    if (form.get("marketingConsent") !== "on")
      found.push({ field: "brief-consent", message: `${t.consent} — ${c.ui.requiredField}` });
    if (form.get("privacyAcknowledged") !== "on")
      found.push({ field: "brief-privacy", message: `${c.ui.privacyAck} — ${c.ui.requiredField}` });

    setErrors(found);
    if (found.length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    try {
      await fetch("/api/briefings/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          marketingConsent: true,
          privacyAcknowledged: true,
          firstName: String(form.get("firstName") ?? "") || undefined,
          company_website: String(form.get("company_website") ?? ""),
        }),
      });
    } catch {
      // Generic outcome regardless: never reveal whether the address exists.
    }
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative max-w-[46rem] space-y-5">
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary title={c.ui.errorSummaryTitle} errors={errors} headingId="brief-errors" />
      </div>

      <Field id="brief-email" label={c.ui.emailLabel} required error={errorFor("brief-email")}>
        {(p) => <input {...p} name="email" type="email" dir="ltr" autoComplete="email" />}
      </Field>
      <Field id="brief-first-name" label={c.ui.firstNameLabel}>
        {(p) => <input {...p} name="firstName" type="text" autoComplete="given-name" />}
      </Field>

      <Checkbox id="brief-consent" name="marketingConsent" label={t.consent} required error={errorFor("brief-consent")} />
      <Checkbox id="brief-privacy" name="privacyAcknowledged" label={c.ui.privacyAck} required error={errorFor("brief-privacy")} />

      <Honeypot />

      <Button type="submit" disabled={pending}>
        {pending ? c.ui.submitting : t.submit}
      </Button>
    </form>
  );
}
