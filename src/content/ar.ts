import type { SiteContent } from "./types";

/**
 * Arabic is the authored original, not a translation of the English file.
 * Lines quoted from BRAND_BUNDLE.md are marked APPROVED; everything else is
 * drafted in the approved register and still carries an editorial gate
 * (spec 6.3): final native review of navigation labels, consent, error and
 * transactional copy is outstanding.
 */
export const ar: SiteContent = {
  locale: "ar",

  meta: {
    siteName: "لينك جوروز",
    corporateLine: "«مَن يقرر… وماذا يبقى»", // APPROVED
    corporateLineTranslation: "Who decides, and what holds.",
    categoryDescriptor:
      "تأطير التحدّي، والتصميم المؤسسي، ونماذج تشغيل الإنسان ووكلاء الذكاء الاصطناعي.",
    masterPromise:
      "نُحدّد تحدّي الذكاء الاصطناعي الذي يستحق الحل، ونعيد تصميم المنظمة بما يلزم لتحقيقه، ثم نُدخل طريقة العمل الجديدة إلى الواقع.", // APPROVED
    pointOfView:
      "أداة الذكاء الاصطناعي ليست هي التحوّل. التحوّل هو منظمة تعرف كيف تستخدمها، وتحكمها، وتحولها إلى قيمة.", // APPROVED
    campaignLine:
      "من تحدّي الذكاء الاصطناعي الذي يستحق الاستثمار إلى نموذج التشغيل الذي يجعله يعمل.", // APPROVED
    t7Promise: "لا يكتمل التصميم المؤسسي إلا بالتطبيق وإدارة التغيير.", // APPROVED
  },

  nav: {
    primary: [
      { label: "متى تستعين بنا", href: "/when-to-involve-us/" },
      { label: "الممارسات", href: "/practices/" },
      { label: "منهجنا والدليل", href: "/approach-and-proof/" },
      { label: "الرؤى", href: "/insights/" },
      { label: "عن لينك جوروز", href: "/about/" },
    ],
    cta: "اطلب مكالمة",
    toggleLabel: "English",
    menuLabel: "فتح القائمة",
    closeLabel: "إغلاق القائمة",
    skipToContent: "تخطَّ إلى المحتوى",
  },

  footer: {
    columns: [
      {
        title: "متى تستعين بنا",
        items: [
          { label: "قرار الاستثمار في الذكاء الاصطناعي", href: "/when-to-involve-us/ai-investment-decision/" },
          { label: "الاستثمار دخل الخدمة والعمل لم يتغيّر", href: "/when-to-involve-us/investment-went-live-work-did-not-change/" },
          { label: "النمو جعل الصلاحيات غير واضحة", href: "/when-to-involve-us/growth-made-authority-unclear/" },
          { label: "وكلاء ذكاء اصطناعي بلا مسؤولية واضحة", href: "/when-to-involve-us/ai-agents-without-clear-accountability/" },
          { label: "تصميم مُعتمد لم يدخل التطبيق", href: "/when-to-involve-us/approved-design-not-enacted/" },
        ],
      },
      {
        title: "الممارسات",
        items: [
          { label: "المختبر", href: "/practices/the-lab/" },
          { label: "البنية والتصميم المؤسسي", href: "/practices/organization-design/" },
          { label: "نموذج التشغيل الذكي", href: "/practices/operating-model/" },
        ],
      },
      {
        title: "أدوات ورؤى",
        items: [
          { label: "الأدوات", href: "/templates/" },
          { label: "الرؤى", href: "/insights/" },
          { label: "الصلاحيات والتصميم المؤسسي", href: "/insights/authority-and-organization-design/" },
          { label: "قرارات الاستثمار في الذكاء الاصطناعي", href: "/insights/ai-investment-decisions/" },
        ],
      },
      {
        title: "المنهج والدليل",
        items: [
          { label: "منهجنا والدليل", href: "/approach-and-proof/" },
          { label: "كيف نعمل", href: "/approach-and-proof/how-we-work/" },
          { label: "ما الذي يُعدّ دليلاً", href: "/approach-and-proof/what-counts-as-proof/" },
          { label: "خبرة المؤسِّس", href: "/approach-and-proof/founder-experience/" },
          { label: "عن لينك جوروز", href: "/about/" },
        ],
      },
      {
        title: "تواصل",
        items: [
          { label: "اطلب مكالمة", href: "/request-a-call/" },
          { label: "النشرة التنفيذية", href: "/briefings/" },
          { label: "الخصوصية", href: "/privacy/" },
          { label: "الشروط", href: "/terms/" },
          { label: "إتاحة الوصول", href: "/accessibility/" },
        ],
      },
    ],
    legalPending:
      "بيانات الكيان النظامي وجهة التسجيل والعنوان لم تُعتمد بعد، ولن تُنشر قبل التحقق منها.",
    copyright: (year) => `© ${year} لينك جوروز. جميع الحقوق محفوظة.`,
  },

  ui: {
    availabilityLegend: "حالة الإتاحة",
    "availability.available-now": "متاح الآن",
    "availability.paid-beta": "نسخة تجريبية مدفوعة",
    "availability.proof-gated": "موقوف على الدليل",
    "availability.scale-gated": "موقوف على خط أساس مُنفَّذ",
    "availability.point-of-view": "وجهة نظر منشورة",
    "evidence.fact": "حقيقة موثّقة",
    "evidence.inference": "استنتاج",
    "evidence.hypothesis": "فرضية",
    "evidence.unknown": "غير معروف",
    tierEntry: "المدخل",
    tierFlagship: "العرض الرئيسي",
    tierScale: "التوسّع",
    fit: "متى يناسبك",
    scope: "النطاق والمخرجات",
    exclusions: "ما لا يشمله",
    completionCondition: "شرط الاكتمال",
    duration: "المدة",
    prerequisite: "المتطلَّب السابق",
    proofBoundary: "حدود الدليل",
    relatedTriggers: "الحالات المرتبطة",
    relatedTemplate: "الأداة المرتبطة",
    relatedOffer: "العرض المرتبط",
    readMore: "اقرأ المزيد",
    backToTriggers: "عد إلى الحالات",
    requestCall: "اطلب مكالمة",
    requestCallContext: "اطلب مكالمة بخصوص هذه الحالة",
    briefingsSecondary: "أو اشترك في النشرة التنفيذية",
    templateGateTitle: "احصل على الأداة عبر البريد",
    templateGateNote:
      "نرسل الملف إلى بريدك الإلكتروني عبر رابط آمن ينتهي خلال ٧٢ ساعة. طلب الملف ليس موافقة على التسويق.",
    emailLabel: "البريد الإلكتروني للعمل",
    firstNameLabel: "الاسم الأول (اختياري)",
    organizationLabel: "المنظمة (اختياري)",
    roleLabel: "الدور (اختياري)",
    privacyAck: "أوافق على معالجة بياناتي لإرسال الملف المطلوب.",
    briefingsOptIn: "أرغب أيضاً في تلقّي النشرة التنفيذية من لينك جوروز.",
    submitTemplate: "أرسل لي الأداة",
    submitting: "جارٍ الإرسال…",
    prices: "لا تُنشر الأسعار على الموقع. تُحدَّد في عرض مكتوب بعد مكالمة الملاءمة.",
    boundaryTitle: "حدّ العمل",
    boundaryBody:
      "لينك جوروز تصمّم المنظمة حول الذكاء الاصطناعي: تأطير التحدّي والقيمة، والأدوار، والصلاحيات، ومسارات العمل، والمسؤولية البشرية، والضوابط، والتغيير، والتبنّي، والمساءلة عن النتائج. أما بناء التقنية وتكاملها وأمنها وتشغيلها فتملكه إدارة تقنية المعلومات لدى العميل أو شريكها التقني.",
    openLabel: "قرار مطلوب",
    draftLabel: "نسخة أولية — بانتظار المراجعة التحريرية",
    proofGatedLabel: "موقوف على الدليل",
    noticeTitle: "ملاحظة",
    formatLabel: "الصيغة",
    sizeLabel: "الحجم",
    languageLabel: "اللغة",
    versionLabel: "الإصدار",
    provenanceLabel: "المصدر",
    errorSummaryTitle: "تعذّر إرسال النموذج",
    requiredField: "هذا الحقل مطلوب.",
    invalidEmail: "أدخل بريداً إلكترونياً صحيحاً.",
    genericError: "تعذّر إتمام الطلب الآن. حاول مرة أخرى بعد قليل.",
    pageNotFoundTitle: "الصفحة غير موجودة",
    pageNotFoundBody: "الرابط الذي طلبته غير متاح. هذه أقرب المسارات المفيدة.",
    counterpartUnavailable:
      "لا توجد نسخة إنجليزية مستقلة لهذه الصفحة بعد. لا نعرض ترجمة آلية بديلاً عنها.",
    templateArabicOnly:
      "هذه الأداة متاحة بالعربية فقط. النسخة الإنجليزية تُكتب بشكل مستقل ولم تصدر بعد.",
  },

  practices: [
    {
      id: "the-lab",
      slug: "the-lab",
      name: "المختبر",
      altName: "The Lab",
      line: "«قرارٌ… لا تقرير»", // APPROVED
      lineTranslation: "A decision, not a report.",
      role: "يُخرج تحدّياً واحداً مؤثّراً إلى العلن، ويُحدّد ما يستحق التمويل، وما يتوقف، ومن يقرر، وأي دليل يعيد فتح القرار.",
      buyer: "الرئيس التنفيذي، رئيس الاستراتيجية، قائد التحوّل، المدير المالي.",
      purpose:
        "حين تتزاحم رهانات الذكاء الاصطناعي بلا قرار يصمد أمام المجلس، يبدأ العمل بتأطير التحدّي نفسه لا بترتيب الأدوات.",
      triggers: ["ai-investment-decision"],
      topics: ["ai-investment-decisions"],
      offers: [
        {
          id: "decision-council",
          anchor: "decision-council",
          tier: "entry",
          name: "مجلس القرار",
          altName: "Challenge Framing Council",
          availability: "paid-beta",
          fit: "أمام القيادة عدة رهانات على الذكاء الاصطناعي أو التحوّل، ولا يوجد قرار «الآن / لاحقاً / لا» يمكن الدفاع عنه أمام المجلس.",
          scope: [
            "تأطير تحدٍّ واحد حقيقي بلغة النتيجة لا بلغة الأداة.",
            "سجل قرار مكتوب: ما يُموَّل، وما يتوقف، وبأي ترتيب.",
            "فجوات الدليل التي تُبقي القرار مفتوحاً.",
            "الصلاحية المسمّاة والمسؤول بالاسم عن النتيجة.",
            "شرط الاكتمال وفق وعد لينك جوروز.",
          ],
          exclusions: [
            "إعادة تصميم مسارات العمل.",
            "بناء نماذج أولية أو اختيار حلول تقنية.",
            "نقل القدرة إلى فريق العميل.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين يوجد سجل قرار موقّع بصلاحية مسمّاة وشرط معلن لإعادة فتح القرار.",
          duration: "يوم عمل واحد، إضافة إلى عمل تحضيري.",
          templateId: "decision-in-view",
        },
        {
          id: "decision-lab",
          anchor: "decision-lab",
          tier: "flagship",
          name: "مختبر القرار",
          altName: "The Decision Lab",
          availability: "proof-gated",
          fit: "يوجد تحدٍّ واحد مؤثّر، وسبق شراء عمل قرار مستقل، وتتوفّر إتاحة حقيقية لأصحاب العمل خلال أيام متتالية.",
          scope: [
            "تأطير المشكلة (يوم).",
            "سبرنت مسار العمل (٢–٤ أيام).",
            "سبرنت التصميم (يومان).",
            "قرار إيقاف / إبقاء / توسيع مع سجل شرط الاكتمال.",
          ],
          exclusions: [
            "التنفيذ التقني أو التكامل أو النشر.",
            "ضمان أمني أو رأي نظامي.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين يصدر قرار إيقاف / إبقاء / توسيع بصلاحية مسمّاة، لا حين يُسلَّم التقرير.",
          duration: "٥–٧ أيام عمل.",
          templateId: "challenge-to-decision-board",
        },
        {
          id: "your-lab",
          anchor: "your-lab",
          tier: "scale",
          name: "مختبركم",
          altName: "Your Lab",
          availability: "scale-gated",
          fit: "بعد تنفيذ مختبر القرار، ورغبة المنظمة في أن يقود فريقها هذا العمل بنفسه.",
          scope: [
            "برنامج موظفين ثنائي اللغة لخمسة أيام.",
            "مختبران تحت إشراف: الأول يُقاد بالمشاركة، والثاني يقوده فريق العميل ونلاحظه.",
            "معايرة الأدوات بعد كل مختبر.",
          ],
          exclusions: [
            "منح شهادة مهنية معتمدة من جهة خارجية.",
            "تدريب استهلاكي عام أو دورة مفتوحة.",
          ],
          completionCondition:
            "تُمنح الأهلية فقط إذا بلغ المختبران معاً المعيار المعلن. أي إشراف إضافي يُحدَّد نطاقه بشكل منفصل.",
          duration: "برنامج ٥ أيام، ومختبران تحت الإشراف.",
          prerequisite: { label: "مختبر القرار", anchor: "decision-lab" },
        },
      ],
    },
    {
      id: "organization-design",
      slug: "organization-design",
      name: "البنية والتصميم المؤسسي",
      altName: "Restructuring & Organization Design",
      line: "«تفويض العمل دون إرساء النموذج المؤسسي»", // APPROVED
      lineTranslation: "Work is delegated without delegating authority.",
      role: "يعيد تصميم الصلاحيات والأدوار وبنية الوظائف والقرارات والتغيير، حتى تستطيع الاستراتيجية أن تعمل.",
      buyer: "المؤسِّس، الرئيس التنفيذي، المجلس، رئيس الموارد البشرية كراعٍ.",
      purpose:
        "حين تعود القرارات إلى الأعلى، أو تنتظر، أو تعبر الوظائف بلا صاحب، فالمسألة بنية صلاحيات لا مسألة أشخاص.",
      triggers: ["growth-made-authority-unclear", "approved-design-not-enacted"],
      topics: ["authority-and-organization-design"],
      offers: [
        {
          id: "authority-map",
          anchor: "authority-map",
          tier: "entry",
          name: "خارطة الصلاحيات",
          altName: "Where Decisions Stop",
          availability: "available-now",
          fit: "المنظمة نمت، والقرارات المادية تتوقف أو تعود إلى شخص واحد، ولا أحد يعرف أين تقف الصلاحية فعلياً.",
          scope: [
            "تتبّع ٢–٣ قرارات مادية حقيقية من الطلب إلى الحسم.",
            "خط أساس لزمن القرار وعدد التسليمات.",
            "الفرق بين صاحب الصلاحية الرسمي وصاحبها الفعلي.",
            "العتبات الغائبة التي تُبقي القرار صاعداً.",
          ],
          exclusions: [
            "تصميم سلالم الرواتب أو المزايا الشاملة.",
            "تقييم أداء الأفراد أو ترشيح إنهاء خدمات.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين يوجد خط أساس مقيس وعتبات صلاحية مقترحة بأسماء أصحابها.",
          duration: "أسبوع واحد.",
          templateId: "decision-delay-trace",
        },
        {
          id: "the-install",
          anchor: "the-install",
          tier: "flagship",
          name: "إرساء النموذج المؤسسي",
          altName: "The Install",
          availability: "proof-gated",
          fit: "المنظمة تحتاج إلى بنية وظائف وأدوار وحقوق قرار جديدة، وإلى إدخالها فعلياً في العمل لا اعتمادها على الورق.",
          scope: [
            "بنية الوظائف ونطاقات الإشراف وطبقات الإدارة.",
            "تعريفات الأدوار وحقوق القرار وعتبات الصلاحية.",
            "سجل الإدخال إلى التطبيق.",
            "حزمة الدليل التشغيلي.",
          ],
          exclusions: [
            "تصميم الأجور الكلية أو سلالم الرواتب.",
            "بناء أو تكامل أو تأمين أو تشغيل الأنظمة.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين تنتقل عتبتان ماديتان للصلاحية على الأقل، وتُستخدمان في قرارات حيّة، وتُلاحظان مقابل خط الأساس.",
          duration: "١٠–١٤ أسبوعاً.",
        },
        {
          id: "standing-review",
          anchor: "standing-review",
          tier: "scale",
          name: "فحص الصلاحيات الدوري",
          altName: "Standing Review",
          availability: "scale-gated",
          fit: "بعد إرساء النموذج المؤسسي وإتمام أول فحص للثبات.",
          scope: [
            "مراجعة انحراف الصلاحيات مقابل خط الأساس المُنفَّذ.",
            "إصدار تصحيحات مسمّاة بأصحابها.",
          ],
          exclusions: ["إعادة تصميم كامل جديد داخل دورة المراجعة."],
          completionCondition:
            "تُعدّ الدورة مكتملة حين تُرصد الانحرافات وتُسند تصحيحاتها إلى أصحاب بالاسم.",
          duration: "دورة نصف سنوية.",
          prerequisite: { label: "إرساء النموذج المؤسسي", anchor: "the-install" },
        },
      ],
    },
    {
      id: "operating-model",
      slug: "operating-model",
      name: "نموذج التشغيل الذكي",
      altName: "The Operating Model",
      line: "«لكل نتيجة… مسؤولٌ بالاسم»", // APPROVED
      lineTranslation: "Every result has an owner by name.",
      role: "يُدخل الذكاء الاصطناعي إلى العمل الحقيقي: مسار العمل، وحدّ الصلاحية، والمسؤول البشري بالاسم، والضوابط، والتصعيد، والتبنّي، والمساءلة عن النتائج.",
      buyer: "الرئيس التنفيذي للعمليات، قائد التحوّل، الرئيس التنفيذي؛ والموارد البشرية وتقنية المعلومات والمخاطر كمؤثّرين.",
      purpose:
        "الاستثمار قد يدخل الخدمة دون أن تتغيّر الأدوار أو التسليمات أو المقاييس. القيمة تبقى معلّقة حتى تتغيّر المنظمة حول الأداة.",
      triggers: [
        "investment-went-live-work-did-not-change",
        "ai-agents-without-clear-accountability",
      ],
      topics: ["adoption-and-value-realization", "ai-agents-and-accountability"],
      offers: [
        {
          id: "value-on-hold",
          anchor: "value-on-hold",
          tier: "entry",
          name: "القيمة المعلّقة",
          altName: "Value on Hold",
          availability: "available-now",
          fit: "استثمار رقمي أو ذكاء اصطناعي دخل الخدمة، والنتيجة المرجوّة لم تتحرك، ولا أحد يريد تسمية المبادرة فاشلة.",
          scope: [
            "توصيف مسار العمل الحيّ والنتيجة المقصودة منه.",
            "خارطة أين تصطدم طريقة العمل الجديدة بالمنظمة الفعلية.",
            "وكيل قيمة متفق عليه وخط أساس له.",
            "أصغر تغيير تنظيمي يُفرج عن القيمة.",
          ],
          exclusions: [
            "تعديل النظام أو التكامل أو نقل البيانات.",
            "الحكم على جودة المنتج التقني أو المورّد.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين يُتفق على وكيل القيمة وخط أساسه، ويُسند التغيير التنظيمي المطلوب إلى صاحب بالاسم.",
          duration: "أسبوعان.",
          templateId: "value-collision-map",
        },
        {
          id: "ai-operating-model",
          anchor: "ai-operating-model",
          tier: "flagship",
          name: "نموذج تشغيل وكلاء الذكاء الاصطناعي",
          altName: "AI Operating Model",
          availability: "proof-gated",
          fit: "تدخل وكلاء الذكاء الاصطناعي إلى العمل، والمطلوب نموذج تنظيمي يحدد من يملك النتيجة وأين يقف حدّ الصلاحية.",
          scope: [
            "حصر الوكلاء والقرارات التي يمسّونها.",
            "إعادة تصميم الأدوار حول العمل الجديد.",
            "المسؤول البشري بالاسم لكل نتيجة.",
            "حدود الصلاحية ونقاط الضبط ومسار التصعيد.",
            "تسلسل الدخول وظيفة بعد وظيفة.",
          ],
          exclusions: [
            "بناء الوكلاء أو تدريبهم أو تكاملهم أو نشرهم.",
            "ضمان أمني أو رأي نظامي أو تدقيق رقابي.",
          ],
          completionCondition:
            "يُعدّ العمل مكتملاً حين يعمل النموذج على وكلاء حقيقيين بأصحاب مسمّين وضوابط مستخدمة فعلاً.",
          duration: "١٢–١٦ أسبوعاً.",
          templateId: "agent-to-owner-blueprint",
        },
        {
          id: "accountability-review",
          anchor: "accountability-review",
          tier: "scale",
          name: "سجل المسؤولية",
          altName: "Accountability Review",
          availability: "scale-gated",
          fit: "بعد تشغيل نموذج وكلاء مُنفَّذ وخط أساس مُصدَّر بإصدار.",
          scope: [
            "إعادة ضبط خط الأساس للوكلاء والنتائج.",
            "مراجعة المسؤولين والصلاحيات والضوابط.",
            "دليل المساءلة عن النتائج.",
          ],
          exclusions: ["تدقيق تقني أو أمني أو رقابي مستقل."],
          completionCondition:
            "تُعدّ الدورة مكتملة حين يُصدَّر خط أساس جديد بأصحاب مسمّين ودليل استخدام فعلي.",
          duration: "دورة ربع سنوية.",
          prerequisite: {
            label: "نموذج تشغيل وكلاء الذكاء الاصطناعي",
            anchor: "ai-operating-model",
          },
        },
      ],
    },
  ],

  triggers: [
    {
      id: "ai-investment-decision",
      slug: "ai-investment-decision",
      title: "قرار الاستثمار في الذكاء الاصطناعي",
      cardLine: "أمامنا عدة رهانات على الذكاء الاصطناعي، ولا قرار يصمد أمام المجلس.",
      buyer: "الرئيس التنفيذي، رئيس الاستراتيجية، قائد التحوّل، المدير المالي.",
      situation: [
        "وصلت إلى القيادة عدة مقترحات للذكاء الاصطناعي من جهات مختلفة، كلٌّ منها معقول بمفرده.",
        "الميزانية محدودة، والمقارنة بينها تجري على أساس الأداة والمورّد، لا على أساس النتيجة.",
        "القرار يُؤجَّل لأن لا أحد يملك أساساً يمكن الدفاع عنه أمام المجلس.",
      ],
      signals: [
        "أكثر من مبادرة ذكاء اصطناعي مطروحة في الوقت نفسه دون ترتيب معلن.",
        "لا يوجد شرط مكتوب يوقف مبادرة أو يعيد فتحها.",
        "المفاضلة تدور حول القدرات التقنية بدل النتيجة التجارية.",
        "لا يوجد اسم واحد يملك القرار النهائي مكتوباً.",
      ],
      atRisk: [
        "إنفاق موزّع على رهانات متوازية لا يصل أيٌّ منها إلى قيمة.",
        "فقدان مصداقية القيادة أمام المجلس عند طلب الجولة التالية من التمويل.",
        "تثبيت مسار تقني يصعب التراجع عنه لاحقاً.",
      ],
      weEstablish: [
        "تحدٍّ واحد مؤطَّر بلغة النتيجة التجارية.",
        "سجل قرار: ما يُموَّل الآن، وما يُؤجَّل، وما يتوقف.",
        "فجوات الدليل التي تُبقي القرار مفتوحاً.",
        "الصلاحية المسمّاة وشرط إعادة فتح القرار.",
      ],
      weDoNot: [
        "لا نختار مورّداً ولا منصة ولا نموذجاً.",
        "لا نبني نماذج أولية ولا ننفّذ تكاملاً.",
        "لا نقدّم رأياً أمنياً أو نظامياً.",
      ],
      templateId: "decision-in-view",
      practiceId: "the-lab",
      offerAnchor: "decision-council",
      availability: "paid-beta",
      proofBoundary: {
        state: "inference",
        note: "البحث الخارجي يوثّق هدر محافظ الاستثمار الرقمي. لا توجد بعد حالة منشورة لعمل قرار مستقل نفّذته لينك جوروز.",
      },
    },
    {
      id: "investment-went-live-work-did-not-change",
      slug: "investment-went-live-work-did-not-change",
      title: "الاستثمار دخل الخدمة… والعمل لم يتغيّر",
      cardLine: "التقنية تعمل، لكن الأدوار والتسليمات والمقاييس بقيت كما كانت.",
      buyer: "الرئيس التنفيذي للعمليات، مدير التحوّل، المدير المالي، الموارد البشرية، تقنية المعلومات.",
      situation: [
        "المشروع سُلّم في موعده، والنظام يعمل، والاستخدام مسجَّل.",
        "لكن النتيجة التي بُرِّر بها الاستثمار لم تتحرك في الأرقام.",
        "لا أحد يريد تسمية المبادرة فاشلة، وهذا التوصيف ليس مطلوباً أصلاً.",
      ],
      signals: [
        "الأدوار وأوصاف الوظائف لم تتغيّر بعد دخول النظام.",
        "يستمر مسار عمل موازٍ يدوي إلى جانب النظام الجديد.",
        "لم يُحدَّث أي مقياس أو تقرير إداري ليعكس طريقة العمل الجديدة.",
        "لا يوجد وكيل قيمة متفق عليه لقياس الأثر.",
      ],
      atRisk: [
        "بقاء قيمة مدفوعة معلّقة إلى أجل غير محدد.",
        "توسّع مبادرة لا تُنتج أثراً، لأن التوقف لم يُصمَّم.",
        "فقدان ثقة الممولين في الموجة التالية من الاستثمار.",
      ],
      weEstablish: [
        "خارطة أين تصطدم طريقة العمل الجديدة بالمنظمة الفعلية.",
        "وكيل قيمة متفق عليه وخط أساس مقيس له.",
        "أصغر تغيير في الأدوار والتسليمات والصلاحيات يُفرج عن القيمة.",
      ],
      weDoNot: [
        "لا نعدّل النظام ولا نصلح التكامل ولا ننقل البيانات.",
        "لا نُصدر حكماً على المورّد أو جودة المنتج التقني.",
      ],
      templateId: "value-collision-map",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      availability: "available-now",
      proofBoundary: {
        state: "inference",
        note: "نمط تعليق القيمة موثّق في البحث المنشور. أول حالة قيمة معلّقة خاصة بلينك جوروز لم تُنشر بعد.",
      },
    },
    {
      id: "growth-made-authority-unclear",
      slug: "growth-made-authority-unclear",
      title: "النمو جعل الصلاحيات غير واضحة",
      cardLine: "القرارات تعود إلى الأعلى، أو تنتظر، أو تعبر الوظائف بلا صاحب.",
      buyer: "المؤسِّس، الرئيس التنفيذي، المجلس، رئيس الموارد البشرية.",
      situation: [
        "المنظمة كبرت أسرع من بنيتها، والهيكل الرسمي لم يعد يصف كيف تُتخذ القرارات فعلاً.",
        "قرارات تشغيلية يومية ما تزال تصل إلى المؤسِّس أو الرئيس التنفيذي.",
        "المسألة ليست شخصاً يعطّل، بل عتبات صلاحية غير موجودة.",
      ],
      signals: [
        "قرارات متكررة تصعد إلى الأعلى دون سبب واضح.",
        "قرار مادي واحد يمرّ بأكثر من ثلاث تسليمات قبل الحسم.",
        "صاحب الصلاحية الرسمي يختلف عن صاحبها الفعلي.",
        "لا توجد عتبة مكتوبة لقيمة أو أثر يجيز القرار عند مستوى أدنى.",
      ],
      atRisk: [
        "بطء متزايد في القرارات كلما نمت المنظمة.",
        "خروج الكفاءات التي لا تجد صلاحية حقيقية.",
        "بقاء الاستراتيجية معلّقة لأن تنفيذها يحتاج قراراً لا يملكه أحد.",
      ],
      weEstablish: [
        "تتبّع ٢–٣ قرارات مادية حقيقية وخط أساس لزمنها.",
        "الفرق بين الصلاحية الرسمية والفعلية.",
        "العتبات الغائبة ومن يجب أن يملكها بالاسم.",
      ],
      weDoNot: [
        "لا نصمّم سلالم رواتب ولا مزايا شاملة.",
        "لا نقيّم أداء الأفراد ولا نرشّح إنهاء خدمات.",
      ],
      templateId: "decision-delay-trace",
      practiceId: "organization-design",
      offerAnchor: "authority-map",
      availability: "available-now",
      proofBoundary: {
        state: "inference",
        note: "خبرة المؤسِّس التشغيلية لا تُحتسب حالة خاصة بلينك جوروز. حالة صلاحيات موثّقة بإذن العميل ما تزال مطلوبة.",
      },
    },
    {
      id: "ai-agents-without-clear-accountability",
      slug: "ai-agents-without-clear-accountability",
      title: "وكلاء ذكاء اصطناعي بلا مسؤولية واضحة",
      cardLine: "مخرجات الوكيل موجودة، والمسؤول عن نتيجتها غير محدد بالاسم.",
      buyer: "الرئيس التنفيذي للعمليات، الموارد البشرية، تقنية المعلومات، المخاطر.",
      situation: [
        "وكلاء ذكاء اصطناعي بدأوا ينتجون قرارات أو مخرجات داخل عمل حقيقي.",
        "لا يوجد سجل يحدد من يملك نتيجة كل وكيل، وأين يقف حدّه، ومتى يُصعَّد الأمر إلى إنسان.",
        "الأثر يظهر أولاً في المساءلة، لا في التقنية.",
      ],
      signals: [
        "لا يوجد حصر معلن للوكلاء العاملين وما يمسّونه من قرارات.",
        "لا يوجد مسؤول بشري مسمّى لكل نتيجة يُنتجها وكيل.",
        "لا توجد قاعدة مكتوبة للتصعيد أو التجاوز اليدوي.",
        "لا يوجد أثر يمكن الرجوع إليه لتفسير قرار صدر عن وكيل.",
      ],
      atRisk: [
        "نتيجة تجارية بلا صاحب حين يُسأل عنها.",
        "توسّع الوكلاء أسرع من قدرة المنظمة على ضبطهم.",
        "انكشاف تنظيمي يظهر متأخراً في مراجعة أو تدقيق.",
      ],
      weEstablish: [
        "وجهة نظر منشورة حول حصر الوكلاء، والمسؤول، والحدّ، والتصعيد، والأثر.",
        "توجيه أي تصادم حيّ إلى أقرب مسار مدعوم بالدليل: القيمة المعلّقة.",
      ],
      weDoNot: [
        "لا نبني الوكلاء ولا ندرّبهم ولا ندمجهم ولا ننشرهم.",
        "لا نقدّم ضماناً أمنياً ولا تدقيقاً رقابياً ولا رأياً نظامياً.",
      ],
      templateId: "agent-to-owner-blueprint",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      availability: "point-of-view",
      proofBoundary: {
        state: "hypothesis",
        note: "لا توجد لدى لينك جوروز حالة تسليم منجزة لوكلاء ذكاء اصطناعي. هذا الموضع منشور كوجهة نظر، والعرض الرئيسي موقوف على الدليل.",
      },
    },
    {
      id: "approved-design-not-enacted",
      slug: "approved-design-not-enacted",
      title: "تصميم مُعتمد لم يدخل التطبيق",
      cardLine: "التصميم اعتُمد، ولم يظهر في الأدوار ولا الصلاحيات ولا المقاييس.",
      buyer: "الرئيس التنفيذي، المجلس، مشترٍ سبق أن اكتوى بتنفيذ متعثر.",
      situation: [
        "هيكل أو نموذج تشغيل جرى اعتماده رسمياً.",
        "بعد أشهر، ما يزال العمل يجري بالطريقة السابقة.",
        "لا أحد يعارض التصميم، ولا أحد يعمل به.",
      ],
      signals: [
        "الأدوار الجديدة موجودة في المستند وغير موجودة في المهام اليومية.",
        "لم تتغيّر حقوق القرار رغم اعتماد الهيكل الجديد.",
        "لم يُحدَّث أي مقياس إداري ليعكس التصميم المعتمد.",
        "لا يوجد سجل يُظهر ما دخل التطبيق فعلاً وما لم يدخل.",
      ],
      atRisk: [
        "استهلاك رأس المال التنظيمي في تصميم لا يعمل.",
        "فقدان الثقة في أي موجة تغيير لاحقة.",
        "بقاء المشكلة الأصلية قائمة تحت اسم جديد.",
      ],
      weEstablish: [
        "معيار الدليل الذي نقيس به الاكتمال قبل أي التزام.",
        "الفرق بين تصميم معتمد وتصميم يعمل في قرارات حيّة.",
        "تأهيل الحالة إلى الممارسة المناسبة بعد قراءة معيار الدليل.",
      ],
      weDoNot: [
        "لا نُقدّم أنفسنا كجهة تصلح عمل استشاريين آخرين.",
        "لا نعد بنتيجة قبل قياس خط أساس.",
      ],
      templateId: "decision-to-hold-map",
      practiceId: "organization-design",
      offerAnchor: "the-install",
      availability: "proof-gated",
      proofBoundary: {
        state: "unknown",
        note: "لا توجد بعد حالة تُثبت الإدخال إلى التطبيق وثباته لدى لينك جوروز. تُقرأ هذه الصفحة مع معيار الدليل قبل أي التزام.",
      },
    },
  ],

  templates: [
    {
      id: "decision-in-view",
      slug: "decision-in-view",
      name: "ورقة الحسم",
      altName: "Decision in View",
      situation:
        "حين تتزاحم مقترحات الذكاء الاصطناعي أمام القيادة ولا يوجد أساس واحد للمقارنة بينها.",
      youComplete: [
        "التحدّي بلغة النتيجة التجارية لا بلغة الأداة.",
        "ما يُموَّل الآن، وما يُؤجَّل، وما يتوقف.",
        "الدليل الناقص الذي يُبقي القرار مفتوحاً.",
        "صاحب الصلاحية بالاسم وشرط إعادة فتح القرار.",
      ],
      itDoesNotProve: [
        "لا تُقيّم جاهزية المنظمة للذكاء الاصطناعي.",
        "لا تختار مورّداً ولا تقارن منصات.",
        "لا تُغني عن قياس خط أساس حقيقي.",
      ],
      version: "v3",
      provenance: "أداة داخلية من مجلس القرار، نُشرت بصيغة قابلة للاستخدام المستقل.",
      triggerId: "ai-investment-decision",
      practiceId: "the-lab",
      offerAnchor: "decision-council",
      fileAvailable: true,
    },
    {
      id: "decision-delay-trace",
      slug: "decision-delay-trace",
      name: "أثر زمن القرار",
      altName: "Decision Delay Trace",
      situation:
        "حين تتأخر القرارات المادية أو تعود إلى الأعلى، والسبب البنيوي غير مرئي.",
      youComplete: [
        "مسار قرار مادي واحد من الطلب إلى الحسم.",
        "كل تسليم ومن يملكه ومدة انتظاره.",
        "صاحب الصلاحية الرسمي مقابل صاحبها الفعلي.",
        "العتبة الغائبة التي كانت ستحسم القرار عند مستوى أدنى.",
      ],
      itDoesNotProve: [
        "لا تقيس أداء الأفراد.",
        "لا تُثبت أن الهيكل خاطئ بمفرده.",
        "لا تُغني عن تتبّع أكثر من قرار واحد.",
      ],
      version: "نسخة مبسطة",
      provenance:
        "النسخة المبسطة من أداة خارطة الصلاحيات. توجد نسخة تفصيلية بالعربية تُستخدم داخل التنفيذ.",
      triggerId: "growth-made-authority-unclear",
      practiceId: "organization-design",
      offerAnchor: "authority-map",
      fileAvailable: true,
    },
    {
      id: "value-collision-map",
      slug: "value-collision-map",
      name: "خارطة أين تعلّقت القيمة",
      altName: "The Value Collision Map",
      situation:
        "حين يدخل استثمار الخدمة ولا تتحرك النتيجة، ويُراد معرفة أين اصطدمت طريقة العمل الجديدة بالمنظمة.",
      youComplete: [
        "مسار العمل الحيّ والنتيجة المقصودة منه.",
        "نقاط التصادم بين الطريقة الجديدة والأدوار القائمة.",
        "وكيل القيمة وخط أساسه.",
        "أصغر تغيير تنظيمي يُفرج عن القيمة.",
      ],
      itDoesNotProve: [
        "لا تُقيّم جودة النظام أو المورّد.",
        "لا تُثبت العائد على الاستثمار.",
        "لا تُغني عن قياس خط أساس متفق عليه.",
      ],
      version: "v1",
      provenance: "أداة مدخل ممارسة نموذج التشغيل الذكي.",
      triggerId: "investment-went-live-work-did-not-change",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      fileAvailable: true,
    },
    {
      id: "challenge-to-decision-board",
      slug: "challenge-to-decision-board",
      name: "لوحة من التحدي إلى الحسم",
      altName: "Challenge-to-Decision Board",
      situation:
        "حين ينتقل تحدٍّ واحد من التأطير إلى إعادة تصميم العمل ثم إلى قرار إيقاف أو إبقاء أو توسيع.",
      youComplete: [
        "التحدّي المؤطَّر ومصدر قيمته.",
        "العمل المعاد تصميمه حوله.",
        "ما جرى اختباره وما لم يُختبر.",
        "قرار إيقاف / إبقاء / توسيع بصاحب مسمّى.",
      ],
      itDoesNotProve: [
        "لا تُغني عن سبرنت عمل حقيقي.",
        "لا تُثبت جدوى الحل التقني.",
      ],
      version: "v1",
      provenance: "أداة العرض الرئيسي لمختبر القرار.",
      triggerId: "ai-investment-decision",
      practiceId: "the-lab",
      offerAnchor: "decision-lab",
      fileAvailable: true,
    },
    {
      id: "agent-to-owner-blueprint",
      slug: "agent-to-owner-blueprint",
      name: "مخطط نتيجة الوكيل ومسؤولها",
      altName: "Agent-to-Owner Blueprint",
      situation:
        "حين ينتج وكيل ذكاء اصطناعي مخرجات داخل عمل حقيقي دون مسؤول بشري مسمّى عن نتيجتها.",
      youComplete: [
        "حصر الوكلاء والقرارات التي يمسّونها.",
        "المسؤول البشري بالاسم لكل نتيجة.",
        "حدّ الصلاحية ونقطة الضبط.",
        "قاعدة التصعيد والتجاوز اليدوي والأثر المرجعي.",
      ],
      itDoesNotProve: [
        "لا تُعدّ تدقيقاً رقابياً ولا ضماناً أمنياً.",
        "لا تُقيّم النموذج التقني للوكيل.",
        "لا تُثبت الامتثال لأي إطار تنظيمي.",
      ],
      version: "v1",
      provenance: "أداة العرض الرئيسي لنموذج تشغيل وكلاء الذكاء الاصطناعي.",
      triggerId: "ai-agents-without-clear-accountability",
      practiceId: "operating-model",
      offerAnchor: "ai-operating-model",
      fileAvailable: true,
    },
    {
      id: "decision-to-hold-map",
      slug: "decision-to-hold-map",
      name: "خارطة «مَن يقرر… وماذا يبقى»",
      altName: "Decision-to-Hold Map",
      situation:
        "حين يُراد قراءة المحفظة كاملة: من يقرر في كل موضع، وما الذي يبقى بعد انتهاء العمل.",
      youComplete: [
        "موضع القرار في كل ممارسة.",
        "ما الذي يجب أن يبقى بعد التسليم.",
        "شرط الاكتمال المرتبط بكل موضع.",
      ],
      itDoesNotProve: ["لا تُغني عن أي أداة مدخل خاصة بحالة واحدة."],
      version: "v1",
      provenance: "خارطة المحفظة الرئيسية.",
      triggerId: "approved-design-not-enacted",
      practiceId: "organization-design",
      offerAnchor: "the-install",
      fileAvailable: false,
      releaseBlocked:
        "لم يُعتمد بعد ما إذا كانت هذه الخارطة أداة عامة أم مستنداً داخلياً للمحفظة. لا تُتاح للتحميل حتى يصدر القرار.",
    },
  ],

  method: [
    {
      id: "awaken",
      index: 1,
      name: "الكشف",
      altName: "Awaken",
      line: "نكشف موضع التعطل", // APPROVED
      body: "نثبّت التفويض والنتيجة المطلوبة والنطاق وصلاحية القرار قبل أي تحليل.",
    },
    {
      id: "assess",
      index: 2,
      name: "خط الأساس",
      altName: "Assess",
      line: "نثبت خط الأساس", // APPROVED
      body: "نقيس الأدوار والصلاحيات ومسارات العمل والمعلومات والمقاييس والجاهزية للتغيير كما هي فعلاً.",
    },
    {
      id: "ai-fit",
      index: 3,
      name: "ملاءمة الذكاء",
      altName: "AI Fit",
      line: "هل يدخل الذكاء الآن؟", // APPROVED
      body: "قرار «الآن» أو «لاحقاً» أو «لا»، بناءً على النتيجة ومسار العمل والقيمة وجدوى البيانات والوصول، والمسؤول البشري، وضبط الحدّ، وقدرة المنظمة على التغيير. المرحلة الثالثة دائماً.",
    },
    {
      id: "anchor",
      index: 4,
      name: "التثبيت",
      altName: "Anchor",
      line: "نثبت من يقرر وما الذي يتغير", // APPROVED
      body: "نحدد الأدوار المستهدفة والصلاحيات ومبادئ التشغيل والمقاييس ومسار التصعيد.",
    },
    {
      id: "align",
      index: 5,
      name: "الإدخال",
      altName: "Align",
      line: "نُدخل التصميم في العمل", // APPROVED
      body: "ندخل الأدوار والصلاحيات والضوابط والقدرة والتواصل وإدارة التغيير إلى العمل الفعلي.",
    },
    {
      id: "ascend",
      index: 6,
      name: "الثبات",
      altName: "Ascend",
      line: "نثبت ما تم تصميمه", // APPROVED
      body: "استخدام حيّ، ثم استقرار، ثم تصحيح، ثم خط أساس بإصدار، ثم مراجعة.",
    },
  ],

  topics: [
    {
      id: "authority-and-organization-design",
      slug: "authority-and-organization-design",
      title: "الصلاحيات والتصميم المؤسسي",
      summary:
        "زمن القرار، واختناق المؤسِّس، وعتبات الصلاحية، والإدخال إلى التطبيق، وانحراف الصلاحيات بعد التنفيذ.",
      evidenceNote:
        "الأطر والأمثلة تُنشر بوصفها منهجاً، لا بوصفها حالات عملاء، حتى تتوفر حالة موثّقة بإذن.",
      triggerId: "growth-made-authority-unclear",
      templateId: "decision-delay-trace",
    },
    {
      id: "ai-investment-decisions",
      slug: "ai-investment-decisions",
      title: "قرارات الاستثمار في الذكاء الاصطناعي",
      summary:
        "كيف يُتخذ قرار «الآن / لاحقاً / لا» على رهانات الذكاء الاصطناعي بأساس يمكن الدفاع عنه.",
      evidenceNote:
        "البحث الخارجي يدعم وجود هدر في محافظ الاستثمار. الطلب المستقل على عمل القرار لدى لينك جوروز لم يُتحقّق منه بعد.",
      triggerId: "ai-investment-decision",
      templateId: "decision-in-view",
    },
    {
      id: "adoption-and-value-realization",
      slug: "adoption-and-value-realization",
      title: "التبنّي وتحقيق القيمة",
      summary:
        "لماذا تبقى القيمة معلّقة حين لا تتغيّر الأدوار ومسارات العمل والصلاحيات حول الاستثمار.",
      evidenceNote:
        "النمط موثّق في بحث خارجي. أول حالة قيمة معلّقة خاصة بلينك جوروز لم تُنشر بعد.",
      triggerId: "investment-went-live-work-did-not-change",
      templateId: "value-collision-map",
    },
    {
      id: "ai-agents-and-accountability",
      slug: "ai-agents-and-accountability",
      title: "وكلاء الذكاء الاصطناعي والمساءلة",
      summary:
        "حصر الوكلاء، والمسؤول بالاسم، وحدّ الصلاحية، والتجاوز والتصعيد، والأثر المرجعي.",
      evidenceNote:
        "مبادئ خارجية ووجهة نظر منشورة فقط. لا توجد لدى لينك جوروز حالة تسليم منجزة لوكلاء ذكاء اصطناعي.",
      triggerId: "ai-agents-without-clear-accountability",
      templateId: "agent-to-owner-blueprint",
    },
  ],
};
