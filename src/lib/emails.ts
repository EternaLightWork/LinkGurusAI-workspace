import "server-only";
import type { Locale } from "./i18n";

/**
 * Transactional email copy (spec 7.5). Each locale is written independently
 * and carries its own subject, body and calls to action.
 *
 * Sender name, reply-to, footer entity data and any physical mailing address
 * are [OPEN] founder decisions. They are injected from configuration; nothing
 * here invents an identity, and the worker refuses to send when they are
 * unset rather than guessing.
 */

export type RenderedEmail = { subject: string; text: string; html: string };

const DIR: Record<Locale, "rtl" | "ltr"> = { ar: "rtl", en: "ltr" };

function layout(locale: Locale, heading: string, blocks: string[], footer: string): string {
  const body = blocks.map((b) => `<p style="margin:0 0 16px;line-height:${locale === "ar" ? 1.9 : 1.6};">${b}</p>`).join("");
  return `<!doctype html><html lang="${locale}" dir="${DIR[locale]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:24px;background:#FFFFFF;color:#080808;font-family:${locale === "ar" ? "Almarai, Arial" : "'Instrument Sans', Arial"},sans-serif;font-size:16px;">
<div style="max-width:560px;margin:0 auto;">
<h1 style="margin:0 0 20px;font-size:20px;line-height:${locale === "ar" ? 1.55 : 1.25};">${heading}</h1>
${body}
<hr style="border:0;border-top:1px solid #DDDDDD;margin:28px 0 16px;">
<p style="margin:0;font-size:13px;color:#585858;line-height:${locale === "ar" ? 1.9 : 1.6};">${footer}</p>
</div></body></html>`;
}

function button(locale: Locale, href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#005CFF;color:#FFFFFF;text-decoration:none;padding:12px 20px;border-radius:2px;font-weight:600;">${label}</a>`;
}

const FOOTER: Record<Locale, string> = {
  ar: "أُرسلت هذه الرسالة لأنك طلبت شيئاً من موقع لينك جوروز. بيانات الكيان النظامي والعنوان لم تُعتمد بعد ولن تُدرج قبل التحقق.",
  en: "You received this because you requested something from the Linkgurus website. Legal entity and address details are not yet verified and are omitted until they are.",
};

export function requestedTemplateEmail(args: {
  locale: Locale;
  templateName: string;
  downloadUrl: string;
  requestAgainUrl: string;
  privacyUrl: string;
  expiryHours: number;
}): RenderedEmail {
  const { locale, templateName, downloadUrl, requestAgainUrl, privacyUrl, expiryHours } = args;

  if (locale === "ar") {
    const subject = `الأداة المطلوبة: ${templateName}`;
    const blocks = [
      `طلبت من موقع لينك جوروز أداة <strong>${templateName}</strong>.`,
      `الرابط أدناه صالح لمرة واحدة وينتهي خلال ${expiryHours} ساعة.`,
      button(locale, downloadUrl, "حمّل الأداة"),
      `إن انتهى الرابط، يمكنك <a href="${requestAgainUrl}" style="color:#0047C4;">طلبه مرة أخرى</a>.`,
      `طلب هذا الملف ليس موافقة على التسويق. <a href="${privacyUrl}" style="color:#0047C4;">سياسة الخصوصية</a>.`,
    ];
    return {
      subject,
      text: `${subject}\n\nالرابط صالح لمرة واحدة وينتهي خلال ${expiryHours} ساعة:\n${downloadUrl}\n\nلطلبه مرة أخرى: ${requestAgainUrl}\nالخصوصية: ${privacyUrl}`,
      html: layout(locale, subject, blocks, FOOTER.ar),
    };
  }

  const subject = `Your requested template: ${templateName}`;
  const blocks = [
    `You requested <strong>${templateName}</strong> from the Linkgurus website.`,
    `The link below works once and expires in ${expiryHours} hours.`,
    button(locale, downloadUrl, "Download the template"),
    `If the link expires, you can <a href="${requestAgainUrl}" style="color:#0047C4;">request it again</a>.`,
    `Requesting this file is not marketing consent. <a href="${privacyUrl}" style="color:#0047C4;">Privacy notice</a>.`,
  ];
  return {
    subject,
    text: `${subject}\n\nThis link works once and expires in ${expiryHours} hours:\n${downloadUrl}\n\nRequest again: ${requestAgainUrl}\nPrivacy: ${privacyUrl}`,
    html: layout(locale, subject, blocks, FOOTER.en),
  };
}

export function briefingConfirmEmail(args: {
  locale: Locale;
  confirmUrl: string;
  privacyUrl: string;
}): RenderedEmail {
  const { locale, confirmUrl, privacyUrl } = args;
  if (locale === "ar") {
    const subject = "أكّد اشتراكك في نشرة لينك جوروز";
    return {
      subject,
      text: `${subject}\n\nأكّد من هنا: ${confirmUrl}\n\nإن لم تطلب ذلك، تجاهل هذه الرسالة.\nالخصوصية: ${privacyUrl}`,
      html: layout(
        locale,
        subject,
        [
          "طلبتَ الاشتراك في النشرة التنفيذية من لينك جوروز. الاشتراك لا يبدأ قبل تأكيدك.",
          button(locale, confirmUrl, "أكّد الاشتراك"),
          "إن لم تطلب هذا، تجاهل الرسالة ولن يُسجَّل اشتراك.",
        ],
        FOOTER.ar,
      ),
    };
  }
  const subject = "Confirm your Linkgurus Briefings subscription";
  return {
    subject,
    text: `${subject}\n\nConfirm here: ${confirmUrl}\n\nIf you did not request this, ignore this message.\nPrivacy: ${privacyUrl}`,
    html: layout(
      locale,
      subject,
      [
        "You asked to receive the Linkgurus Briefings. The subscription does not start until you confirm.",
        button(locale, confirmUrl, "Confirm subscription"),
        "If you did not request this, ignore this message and no subscription is recorded.",
      ],
      FOOTER.en,
    ),
  };
}

export function briefingConfirmedEmail(args: {
  locale: Locale;
  unsubscribeUrl: string;
}): RenderedEmail {
  const { locale, unsubscribeUrl } = args;
  if (locale === "ar") {
    const subject = "تم تأكيد اشتراكك";
    return {
      subject,
      text: `${subject}\n\nيمكنك إلغاء الاشتراك في أي وقت: ${unsubscribeUrl}`,
      html: layout(
        locale,
        subject,
        [
          "اشتراكك في النشرة التنفيذية مفعّل الآن.",
          `يمكنك <a href="${unsubscribeUrl}" style="color:#0047C4;">إلغاء الاشتراك</a> في أي وقت.`,
        ],
        FOOTER.ar,
      ),
    };
  }
  const subject = "Your subscription is confirmed";
  return {
    subject,
    text: `${subject}\n\nYou can unsubscribe at any time: ${unsubscribeUrl}`,
    html: layout(
      locale,
      subject,
      [
        "Your Briefings subscription is now active.",
        `You can <a href="${unsubscribeUrl}" style="color:#0047C4;">unsubscribe</a> at any time.`,
      ],
      FOOTER.en,
    ),
  };
}

export function unsubscribeConfirmedEmail(locale: Locale): RenderedEmail {
  if (locale === "ar") {
    const subject = "تم إلغاء اشتراكك";
    return {
      subject,
      text: `${subject}\n\nلن تصلك رسائل النشرة بعد الآن.`,
      html: layout(locale, subject, ["لن تصلك رسائل النشرة التنفيذية بعد الآن."], FOOTER.ar),
    };
  }
  const subject = "You have been unsubscribed";
  return {
    subject,
    text: `${subject}\n\nYou will no longer receive the Briefings.`,
    html: layout(locale, subject, ["You will no longer receive the Linkgurus Briefings."], FOOTER.en),
  };
}

export function enquiryAcknowledgementEmail(locale: Locale): RenderedEmail {
  if (locale === "ar") {
    const subject = "وصلنا طلب المكالمة";
    return {
      subject,
      // No response time is promised: the SLA is an [OPEN] decision (spec 5.17).
      text: `${subject}\n\nوصلنا طلبك وسنراجعه. لا نلتزم بقبول كل طلب.`,
      html: layout(
        locale,
        subject,
        [
          "وصلنا طلب المكالمة، وسنراجع الحالة التي وصفتها.",
          "لا نلتزم بقبول كل طلب. إن لم تكن لينك جوروز الجهة المناسبة، سنقول ذلك بوضوح.",
        ],
        FOOTER.ar,
      ),
    };
  }
  const subject = "We received your call request";
  return {
    subject,
    text: `${subject}\n\nWe received your request and will review it. We do not accept every request.`,
    html: layout(
      locale,
      subject,
      [
        "We received your call request and will review the situation you described.",
        "We do not accept every request. If Linkgurus is not the right firm, we will say so plainly.",
      ],
      FOOTER.en,
    ),
  };
}

export function internalEnquiryNotification(args: {
  enquiryId: number;
  maskedEmail: string;
  country: string;
  triggerId?: string | null;
  practiceId?: string | null;
  offerId?: string | null;
}): RenderedEmail {
  const subject = `New enquiry #${args.enquiryId}`;
  const lines = [
    `Enquiry: #${args.enquiryId}`,
    `Contact: ${args.maskedEmail}`,
    `Country: ${args.country}`,
    `Trigger: ${args.triggerId ?? "—"}`,
    `Practice: ${args.practiceId ?? "—"}`,
    `Offer: ${args.offerId ?? "—"}`,
    "",
    "Full details are in the enquiries table. This notification deliberately omits the raw form body.",
  ];
  return {
    subject,
    text: lines.join("\n"),
    html: layout("en", subject, lines.filter(Boolean).map((l) => l), FOOTER.en),
  };
}

export function operatorFailureAlert(args: { jobId: number; type: string; error: string }): RenderedEmail {
  const subject = `Email job ${args.jobId} failed permanently`;
  const lines = [
    `Job: #${args.jobId}`,
    `Type: ${args.type}`,
    `Last error: ${args.error}`,
    "The job has exhausted its retries and will not be attempted again.",
  ];
  return { subject, text: lines.join("\n"), html: layout("en", subject, lines, FOOTER.en) };
}
