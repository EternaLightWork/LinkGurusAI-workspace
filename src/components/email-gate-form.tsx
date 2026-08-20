"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getContent } from "@/content";
import type { TemplateId } from "@/content/types";
import { localeHref, type Locale } from "@/lib/i18n";
import { Checkbox, ErrorSummary, Field, Honeypot } from "./form-fields";
import { Button } from "./primitives";

type FieldError = { field: string; message: string };

/**
 * Spec 4.2 EmailGateForm / 7.3. The resource request and marketing consent
 * are separate controls: the briefings checkbox is unchecked by default and
 * never blocks delivery of the requested file.
 */
export function EmailGateForm({
  locale,
  templateId,
  context,
}: {
  locale: Locale;
  templateId: TemplateId;
  context?: Record<string, string>;
}) {
  const c = getContent(locale);
  const router = useRouter();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [pending, setPending] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  /** Inline messages drop the field-name prefix the summary needs. */
  const errorFor = (field: string) =>
    errors.find((e) => e.field === field)?.message.split(" — ").pop();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const privacy = form.get("privacyAcknowledged") === "on";

    // Summary entries name their field: two bare "required" lines tell a
    // screen-reader user nothing about where to go.
    const found: FieldError[] = [];
    if (!email) found.push({ field: "gate-email", message: `${c.ui.emailLabel} — ${c.ui.requiredField}` });
    else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email))
      found.push({ field: "gate-email", message: `${c.ui.emailLabel} — ${c.ui.invalidEmail}` });
    if (!privacy) found.push({ field: "gate-privacy", message: `${c.ui.privacyAck} — ${c.ui.requiredField}` });

    setErrors(found);
    if (found.length > 0) {
      // Move focus to the summary so the error is announced (spec 10.4).
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    try {
      await fetch("/api/template-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          templateId,
          locale,
          privacyAcknowledged: true,
          briefingsOptIn: form.get("briefingsOptIn") === "on",
          firstName: String(form.get("firstName") ?? "") || undefined,
          organization: String(form.get("organization") ?? "") || undefined,
          role: String(form.get("role") ?? "") || undefined,
          company_website: String(form.get("company_website") ?? ""),
          context: { ...context, template: templateId },
        }),
      });
    } catch {
      // The response is generic either way; a network failure must not reveal
      // anything about the address, so the visitor still sees the same page.
    }
    router.push(localeHref(locale, "/template-request-received/"));
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary title={c.ui.errorSummaryTitle} errors={errors} headingId="gate-errors" />
      </div>

      <Field id="gate-email" label={c.ui.emailLabel} required error={errorFor("gate-email")}>
        {(props) => <input {...props} name="email" type="email" dir="ltr" autoComplete="email" />}
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field id="gate-first-name" label={c.ui.firstNameLabel}>
          {(props) => <input {...props} name="firstName" type="text" autoComplete="given-name" />}
        </Field>
        <Field id="gate-organization" label={c.ui.organizationLabel}>
          {(props) => <input {...props} name="organization" type="text" autoComplete="organization" />}
        </Field>
        <Field id="gate-role" label={c.ui.roleLabel}>
          {(props) => <input {...props} name="role" type="text" autoComplete="organization-title" />}
        </Field>
      </div>

      <Checkbox
        id="gate-privacy"
        name="privacyAcknowledged"
        label={c.ui.privacyAck}
        required
        error={errorFor("gate-privacy")}
      />

      {/* Separate, unchecked, optional. Not a condition of the download. */}
      <Checkbox id="gate-briefings" name="briefingsOptIn" label={c.ui.briefingsOptIn} />

      <Honeypot />

      <Button type="submit" disabled={pending}>
        {pending ? c.ui.submitting : c.ui.submitTemplate}
      </Button>

      <p className="text-sm text-neutral-600">{c.ui.templateGateNote}</p>
    </form>
  );
}
