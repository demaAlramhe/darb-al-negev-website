import type { TravelPackage } from "@/types/package";

export const packages: TravelPackage[] = [
  {
    id: "istanbul-4-nights",
    imageGradient: "from-slate-700 via-blue-800 to-indigo-950",
    imageIcon: "🕌",
    badge: "new",
    featured: true,
    title: { ar: "إسطنبول — 4 ليالي", he: "איסטנבול — 4 לילות" },
    destination: { ar: "تركيا — إسطنبول", he: "טורקיה — איסטנבול" },
    price: { ar: "₪1,890", he: "₪1,890" },
    date: { ar: "حسب العروض المتاحة", he: "לפי המבצעים הזמינים" },
    duration: { ar: "4 ليالي / 5 أيام", he: "4 לילות / 5 ימים" },
    description: {
      ar: "بكج طيران وفندق لمدينة إسطنبول — مزيج من التاريخ والثقافة والتسوق.",
      he: "חבילת טיסה ומלון לאיסטנבול — שילוב של היסטוריה, תרבות וקניות.",
    },
  },
  {
    id: "sharm-el-sheikh",
    imageGradient: "from-teal-600 via-cyan-700 to-blue-900",
    imageIcon: "🏖️",
    badge: "special",
    featured: true,
    title: { ar: "شرم الشيخ", he: "שארם א-שייח" },
    destination: { ar: "مصر — شرم الشيخ", he: "מצרים — שארם א-שייח" },
    price: { ar: "₪1,450", he: "₪1,450" },
    date: { ar: "عروض صيف 2026", he: "מבצעי קיץ 2026" },
    duration: { ar: "5 ليالي / 6 أيام", he: "5 לילות / 6 ימים" },
    description: {
      ar: "إقامة على البحر الأحمر مع فندق وإمكانية شاملة — مثالي للعائلات والأزواج.",
      he: "חופשה על הים האדום עם מלון ואפשרות לכל כלול — מתאים למשפחות וזוגות.",
    },
  },
  {
    id: "dubai-package",
    imageGradient: "from-amber-600 via-orange-700 to-yellow-900",
    imageIcon: "🏙️",
    badge: "popular",
    featured: true,
    title: { ar: "دبي", he: "דובאי" },
    destination: { ar: "الإمارات — دبي", he: "איחוד האמירויות — דובאי" },
    price: { ar: "₪2,200", he: "₪2,200" },
    date: { ar: "مواعيد متعددة", he: "מועדים שונים" },
    duration: { ar: "4 ليالي / 5 أيام", he: "4 לילות / 5 ימים" },
    description: {
      ar: "بكج سفر لمدينة دبي — تسوق، فعاليات عائلية وإقامة في فندق منتقى.",
      he: "חבילת נסיעה לדובאי — קניות, פעילויות משפחתיות ולינה במלון נבחר.",
    },
  },
  {
    id: "northern-israel",
    imageGradient: "from-green-700 via-emerald-800 to-teal-900",
    imageIcon: "🌿",
    badge: "popular",
    title: { ar: "شمال البلاد", he: "צפון הארץ" },
    destination: { ar: "الجليل، الكرمل والساحل", he: "גליל, כרמל וחוף הים" },
    price: { ar: "₪680", he: "₪680" },
    date: { ar: "كل عطلة نهاية أسبوع", he: "כל סוף שבוע" },
    duration: { ar: "2 ليالي / 3 أيام", he: "2 לילות / 3 ימים" },
    description: {
      ar: "رحلة داخلية في شمال البلاد — طبيعة، شواطئ ومعالم سياحية منظمة.",
      he: "טיול בארץ בצפון — טבע, חופים ואתרים תיירותיים מאורגנים.",
    },
  },
  {
    id: "dead-sea",
    imageGradient: "from-stone-500 via-amber-800 to-yellow-950",
    imageIcon: "🧘",
    badge: "special",
    title: { ar: "البحر الميت", he: "ים המלח" },
    destination: { ar: "منطقة البحر الميت وعين بوكيك", he: "אזור ים המלח ועין בוקק" },
    price: { ar: "₪590", he: "₪590" },
    date: { ar: "عروض موسمية", he: "מבצעים עונתיים" },
    duration: { ar: "ليلة واحدة / يومان", he: "לילה אחד / יומיים" },
    description: {
      ar: "بكج إقامة واسترخاء في منتجعات البحر الميت — مناسب للعائلات.",
      he: "חבילת לינה ורוגע במתחמי ים המלח — מתאים למשפחות.",
    },
  },
  {
    id: "europe-deals",
    imageGradient: "from-violet-700 via-purple-800 to-indigo-950",
    imageIcon: "🗼",
    badge: "new",
    title: { ar: "أوروبا حسب العروض", he: "אירופה לפי מבצעים" },
    destination: { ar: "وجهات أوروبية متنوعة", he: "יעדים אירופיים מגוונים" },
    price: { ar: "حسب الوجهة", he: "לפי היעד" },
    date: { ar: "عروض متجددة", he: "מבצעים מתחדשים" },
    duration: { ar: "حسب البكج", he: "לפי החבילה" },
    description: {
      ar: "عروض طيران وفنادق لوجهات أوروبية — باريس، روما، برشلونة وغيرها حسب التوفر.",
      he: "הצעות טיסה ומלון ליעדים באירופה לפי מבצעים וזמינות.",
    },
  },
  {
    id: "flight-hotel-deals",
    imageGradient: "from-sky-600 via-blue-700 to-slate-900",
    imageIcon: "✈️",
    badge: "special",
    featured: true,
    title: { ar: "عروض طيران وفنادق", he: "חבילות טיסה ומלון" },
    destination: { ar: "وجهات داخلية ودولية", he: "יעדים בארץ ובחו״ל" },
    price: { ar: "من ₪499", he: "מ-₪499" },
    date: { ar: "تحديث أسبوعي", he: "עדכון שבועי" },
    duration: { ar: "حسب العرض", he: "לפי ההצעה" },
    description: {
      ar: "عروض خاصة من شركات الطيران وشركات السفر — طيران + فندق بأسعار منافسة.",
      he: "מבצעים מיוחדים מחברות תעופה וחברות נסיעות — טיסה + מלון במחירים אטרקטיביים.",
    },
  },
];

export const galleryItems = [
  {
    id: "gallery-1",
    image: "/gallery/rhlatGauya.png",
    label: { ar: "رحلات جوية", he: "טיסות" },
  },
  {
    id: "gallery-2",
    image: "/gallery/atlatalaAllshatei.png",
    label: { ar: "عطلات على الشاطئ", he: "חופשות חוף" },
  },
  {
    id: "gallery-3",
    image: "/gallery/sfarAlmodon.png",
    label: { ar: "سفر المدن", he: "טיולי ערים" },
  },
  {
    id: "gallery-4",
    image: "/gallery/rhlatAlya.png",
    label: { ar: "رحلات عائلية", he: "טיולים משפחתיים" },
  },
  {
    id: "gallery-5",
    image: "/gallery/tbeaaWsyaha.png",
    label: { ar: "طبيعة وسياحة", he: "טבע ותיירות" },
  },
  {
    id: "gallery-6",
    image: "/gallery/fnadekWbakegat.png",
    label: { ar: "فنادق وبكجات", he: "מלונות וחבילות" },
  },
];

export const featuredPackages = packages.filter((p) => p.featured);
