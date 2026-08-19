import Image from "next/image";
import type { Locale } from "@/lib/i18n";

/**
 * The Agentic Organization master visual (spec 5.1, block 4).
 *
 * Built as semantic markup rather than a flat SVG so it mirrors correctly in
 * RTL, reflows on small screens, and is readable by assistive technology.
 * The chain direction is expressed by explicit LTR/RTL arrow assets — a
 * directional icon is never CSS-rotated (spec 3.4).
 */

type Step = { id: string; label: string; note: string };

const STEPS: Record<Locale, Step[]> = {
  ar: [
    { id: "strategy", label: "الاستراتيجية", note: "النتيجة التجارية المطلوبة والتحدّي الذي يستحق الحل." },
    { id: "value", label: "القيمة", note: "أين تُصنع القيمة، وبأي وكيل قياس، وعلى أي خط أساس." },
    { id: "structure", label: "البنية والحوكمة", note: "الأدوار وحقوق القرار وعتبات الصلاحية." },
    { id: "workflow", label: "عمل الإنسان والوكيل", note: "مسار العمل المشترك وحدوده ونقاط التسليم." },
    { id: "controls", label: "الضوابط", note: "المسؤول بالاسم، ونقطة الضبط، والتصعيد، والأثر المرجعي." },
    { id: "customer", label: "قيمة العميل", note: "ما يصل إلى العميل النهائي فعلاً بعد التغيير." },
    { id: "review", label: "المراجعة", note: "خط أساس بإصدار، وملاحظة الثبات، وتصحيح الانحراف." },
  ],
  en: [
    { id: "strategy", label: "Strategy", note: "The intended business result and the challenge worth solving." },
    { id: "value", label: "Value", note: "Where value is created, against which proxy and which baseline." },
    { id: "structure", label: "Structure & governance", note: "Roles, decision rights and authority thresholds." },
    { id: "workflow", label: "Human–agent workflow", note: "The shared workflow, its boundaries and its handoffs." },
    { id: "controls", label: "Controls", note: "Named owner, control point, escalation and reference trail." },
    { id: "customer", label: "Customer value", note: "What actually reaches the end customer after the change." },
    { id: "review", label: "Review", note: "A versioned baseline, hold observation and drift correction." },
  ],
};

const SPLIT: Record<Locale, { ours: { title: string; items: string[] }; theirs: { title: string; items: string[] } }> = {
  ar: {
    ours: {
      title: "لينك جوروز تملك النظام التجاري",
      items: [
        "تأطير التحدّي والقيمة",
        "المنظمة والأدوار والصلاحيات والحوكمة",
        "مسارات عمل الإنسان والوكيل وحدود المسؤولية",
        "التغيير والإدخال والتبنّي وثبات القيمة",
      ],
    },
    theirs: {
      title: "تقنية المعلومات لدى العميل أو شريكها التقني تملك التقنية",
      items: [
        "المعمارية التقنية والمنصّة",
        "هندسة البيانات والتكامل وتنفيذ الوصول",
        "الأمن والبنية التحتية والتشغيل التقني",
        "بناء النماذج والوكلاء ونشرهم ومراقبتهم تقنياً",
      ],
    },
  },
  en: {
    ours: {
      title: "Linkgurus owns the business system",
      items: [
        "Challenge and value framing",
        "Organization, roles, authority and governance",
        "Human–agent workflows, boundaries and accountability",
        "Change, enactment, adoption and value hold",
      ],
    },
    theirs: {
      title: "The client's IT function or technology partner owns the technology",
      items: [
        "Technical architecture and platform",
        "Data engineering, integrations and access implementation",
        "Security, infrastructure and technical operations",
        "Model and agent build, deployment and technical monitoring",
      ],
    },
  },
};

export function AgenticOrganizationVisual({ locale }: { locale: Locale }) {
  const steps = STEPS[locale];
  const arrow =
    locale === "ar"
      ? "/icons/navigation/linkgurus-icon-navigation-arrow-left.svg"
      : "/icons/navigation/linkgurus-icon-navigation-arrow-right.svg";

  return (
    <div>
      <ol className="grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.id} className="relative flex flex-col gap-2 bg-neutral-0 p-5">
            <span className="text-sm font-semibold tabular-nums text-blue-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold text-balance">{step.label}</h3>
            <p className="text-sm text-neutral-700">{step.note}</p>
            {i < steps.length - 1 && (
              <Image
                src={arrow}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="absolute bottom-4 h-4 w-4 opacity-40 end-4"
              />
            )}
          </li>
        ))}
        {/* Seven steps in a four-column grid leave one cell empty; without a
            filler the parent's rule colour shows through as a grey block. */}
        <li aria-hidden="true" className="hidden bg-neutral-0 lg:block" />
      </ol>

      <div className="mt-8 grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2">
        <div className="bg-neutral-0 p-6">
          <p className="mb-3 border-s-2 border-blue-500 ps-3 text-base font-bold">
            {SPLIT[locale].ours.title}
          </p>
          <ul className="space-y-2">
            {SPLIT[locale].ours.items.map((item) => (
              <li key={item} className="flex gap-3 text-neutral-950">
                <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-neutral-25 p-6">
          <p className="mb-3 border-s-2 border-neutral-400 ps-3 text-base font-bold text-neutral-700">
            {SPLIT[locale].theirs.title}
          </p>
          <ul className="space-y-2">
            {SPLIT[locale].theirs.items.map((item) => (
              <li key={item} className="flex gap-3 text-neutral-600">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-2 w-2 shrink-0 border border-neutral-500 bg-[repeating-linear-gradient(45deg,var(--color-neutral-500)_0,var(--color-neutral-500)_1px,transparent_1px,transparent_2.5px)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
