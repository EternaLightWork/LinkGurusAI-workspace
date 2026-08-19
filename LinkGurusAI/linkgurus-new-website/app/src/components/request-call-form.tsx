"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getContent } from "@/content";
import { localeHref, type Locale } from "@/lib/i18n";
import { Checkbox, ErrorSummary, Field, Honeypot } from "./form-fields";
import { Button } from "./primitives";

type FieldError = { field: string; message: string };

const LABELS: Record<Locale, Record<string, string>> = {
  ar: {
    name: "الاسم",
    organization: "المنظمة",
    role: "الدور",
    country: "الدولة",
    trigger: "الحالة القائمة الآن",
    triggerNone: "غير محددة / أخرى",
    decisionDate: "تاريخ أو حدث يحكم القرار (اختياري)",
    contextNote: "سياق مختصر",
    contextHint: "ما الذي يحدث الآن، وما النتيجة المطلوبة، ومن يملك القرار.",
    preferredLanguage: "لغة التواصل المفضّلة",
    phone: "الهاتف (اختياري)",
    referral: "كيف وصلت إلينا؟ (اختياري)",
    submit: "أرسل الطلب",
    optionalGroup: "حقول اختيارية",
  },
  en: {
    name: "Name",
    organization: "Organization",
    role: "Role",
    country: "Country",
    trigger: "The situation you have now",
    triggerNone: "Not listed / other",
    decisionDate: "A date or event governing the decision (optional)",
    contextNote: "Short context",
    contextHint: "What is happening now, the result you need, and who holds the decision.",
    preferredLanguage: "Preferred language",
    phone: "Phone (optional)",
    referral: "How did you find us? (optional)",
    submit: "Send the request",
    optionalGroup: "Optional details",
  },
};

/**
 * Spec 4.2 RequestCallForm / 5.17. Carries source context through hidden
 * fields drawn from the allowlisted query parameters, so a trigger, practice,
 * offer, template or article reaches the enquiry record intact.
 */
export function RequestCallForm({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const l = LABELS[locale];
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [pending, setPending] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorFor = (field: string) =>
    errors.find((e) => e.field === field)?.message.split(" — ").pop();

  const context = {
    source: searchParams.get("source") ?? undefined,
    trigger: searchParams.get("trigger") ?? undefined,
    practice: searchParams.get("practice") ?? undefined,
    offer: searchParams.get("offer") ?? undefined,
    template: searchParams.get("template") ?? undefined,
    article: searchParams.get("article") ?? undefined,
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    const found: FieldError[] = [];
    // Each summary entry names its field so the list is navigable.
    const require = (key: string, id: string, label: string) => {
      if (!value(key)) found.push({ field: id, message: `${label} — ${c.ui.requiredField}` });
    };
    require("name", "call-name", l.name);
    require("organization", "call-organization", l.organization);
    require("role", "call-role", l.role);
    require("country", "call-country", l.country);
    require("contextNote", "call-context", l.contextNote);

    const email = value("email");
    if (!email) found.push({ field: "call-email", message: `${c.ui.emailLabel} — ${c.ui.requiredField}` });
    else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email))
      found.push({ field: "call-email", message: `${c.ui.emailLabel} — ${c.ui.invalidEmail}` });

    if (form.get("privacyAcknowledged") !== "on")
      found.push({ field: "call-privacy", message: `${c.ui.privacyAck} — ${c.ui.requiredField}` });

    setErrors(found);
    if (found.length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    try {
      await fetch("/api/enquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: value("name"),
          organization: value("organization"),
          role: value("role"),
          country: value("country"),
          triggerId: value("triggerId") || undefined,
          decisionDate: value("decisionDate") || undefined,
          contextNote: value("contextNote"),
          preferredLanguage: value("preferredLanguage") || locale,
          privacyAcknowledged: true,
          phone: value("phone") || undefined,
          practiceId: context.practice,
          offerId: context.offer,
          referralSource: value("referralSource") || undefined,
          company_website: value("company_website"),
          context: {
            ...context,
            landingPath: typeof window === "undefined" ? undefined : window.location.pathname,
          },
        }),
      });
    } catch {
      // Response is generic either way; the visitor still reaches the
      // acknowledgement page rather than an error that leaks state.
    }
    router.push(localeHref(locale, "/request-a-call/received/"));
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary title={c.ui.errorSummaryTitle} errors={errors} headingId="call-errors" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="call-name" label={l.name} required error={errorFor("call-name")}>
          {(p) => <input {...p} name="name" type="text" autoComplete="name" />}
        </Field>
        <Field id="call-email" label={c.ui.emailLabel} required error={errorFor("call-email")}>
          {(p) => <input {...p} name="email" type="email" dir="ltr" autoComplete="email" />}
        </Field>
        <Field id="call-organization" label={l.organization} required error={errorFor("call-organization")}>
          {(p) => <input {...p} name="organization" type="text" autoComplete="organization" />}
        </Field>
        <Field id="call-role" label={l.role} required error={errorFor("call-role")}>
          {(p) => <input {...p} name="role" type="text" autoComplete="organization-title" />}
        </Field>
        <Field id="call-country" label={l.country} required error={errorFor("call-country")}>
          {(p) => <input {...p} name="country" type="text" autoComplete="country-name" />}
        </Field>
        <Field id="call-language" label={l.preferredLanguage} required>
          {(p) => (
            <select {...p} name="preferredLanguage" defaultValue={locale}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          )}
        </Field>
      </div>

      <Field id="call-trigger" label={l.trigger}>
        {(p) => (
          <select {...p} name="triggerId" defaultValue={context.trigger ?? ""}>
            <option value="">{l.triggerNone}</option>
            {c.triggers.map((trigger) => (
              <option key={trigger.id} value={trigger.id}>
                {trigger.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="call-decision-date" label={l.decisionDate}>
        {(p) => <input {...p} name="decisionDate" type="text" />}
      </Field>

      <Field id="call-context" label={l.contextNote} hint={l.contextHint} required error={errorFor("call-context")}>
        {(p) => <textarea {...p} name="contextNote" rows={5} className={`${p.className} min-h-32`} />}
      </Field>

      <fieldset className="border border-neutral-200 p-5">
        <legend className="px-2 text-sm font-semibold text-neutral-600">{l.optionalGroup}</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="call-phone" label={l.phone}>
            {(p) => <input {...p} name="phone" type="tel" dir="ltr" autoComplete="tel" />}
          </Field>
          <Field id="call-referral" label={l.referral}>
            {(p) => <input {...p} name="referralSource" type="text" />}
          </Field>
        </div>
      </fieldset>

      <Checkbox
        id="call-privacy"
        name="privacyAcknowledged"
        label={c.ui.privacyAck}
        required
        error={errorFor("call-privacy")}
      />

      <Honeypot />

      <Button type="submit" disabled={pending}>
        {pending ? c.ui.submitting : l.submit}
      </Button>
    </form>
  );
}
