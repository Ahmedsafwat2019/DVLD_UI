import { BadgeInfoIcon } from "@/components/ui/icons/lucide-badge-info";
import { CarIcon } from "@/components/ui/icons/lucide-car";
import { HouseIcon } from "@/components/ui/icons/lucide-house";
import { SendHorizontalIcon } from "@/components/ui/icons/lucide-send-horizontal";

import {
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  TrendingUpIcon,
  GlobeIcon,
  AwardIcon,
} from "@/components/ui/icons/lucide";

export const navLinks = [
  { href: "/", label: "الرئيسية", icon: <HouseIcon /> },
  { href: "/about", label: "عن المؤسسة", icon: <BadgeInfoIcon /> },
  { href: "/services", label: "خدماتنا", icon: <CarIcon /> },
  { href: "/contact", label: "تواصل معنا", icon: <SendHorizontalIcon /> },
];

export const services = [
  {
    href: "/services/license",
    label: "تجديد رخصة القيادة",
  },
  {
    href: "/services/registration",
    label: "تسجيل المركبات",
  },
  {
    href: "/services/fines",
    label: "الاستعلام عن المخالفات",
  },
  {
    href: "/services/appointment",
    label: "حجز موعد",
  },
  {
    href: "/services/online",
    label: "الخدمات الإلكترونية",
  },
];

export const stats = [
  { number: "50+", label: "سنة من الخبرة", icon: <ClockIcon /> },
  { number: "10M+", label: "مواطن يثق بنا", icon: <UsersIcon /> },
  { number: "99.9%", label: "معدل الأمان", icon: <ShieldCheckIcon /> },
  { number: "24/7", label: "خدمة العملاء", icon: <GlobeIcon /> },
];

export const values = [
  {
    icon: <ShieldCheckIcon />,
    title: "الأمان والموثوقية",
    description:
      "نضمن أعلى معايير الأمان في جميع خدماتنا الإلكترونية لحماية بيانات المواطنين",
  },
  {
    icon: <UsersIcon />,
    title: "خدمة المواطن أولاً",
    description:
      "نضع احتياجات المواطنين في المقدمة ونعمل على تسهيل جميع الإجراءات",
  },
  {
    icon: <TrendingUpIcon />,
    title: "التطوير المستمر",
    description:
      "نطور خدماتنا باستمرار لمواكبة أحدث التقنيات والمعايير العالمية",
  },
  {
    icon: <AwardIcon />,
    title: "التميز في الأداء",
    description: "نسعى لتحقيق أعلى مستويات الجودة والكفاءة في جميع خدماتنا",
  },
];

export const achievements = [
  {
    year: "2024",
    title: "أفضل بوابة حكومية إلكترونية",
    description: "جائزة التميز في الخدمات الإلكترونية من وزارة الاتصالات",
  },
  {
    year: "2023",
    title: "شهادة الأيزو 27001",
    description: "شهادة الأمان السيبراني للمعلومات من المنظمة الدولية للمعايير",
  },
  {
    year: "2022",
    title: "جائزة الابتكار الحكومي",
    description: "تقديراً لجهودنا في تطوير الخدمات الرقمية المبتكرة",
  },
  {
    year: "2021",
    title: "أفضل تجربة مستخدم",
    description:
      "جائزة التميز في تصميم واجهات المستخدم من جمعية المصممين العرب",
  },
];

export const team = [
  {
    name: "المهندس أحمد محمد",
    position: "مدير عام الإدارة العامة للمرور",
    image: "/images/team/ahmed.jpg",
    description: "خبرة 25 عاماً في إدارة المرور والخدمات الحكومية",
  },
  {
    name: "الدكتورة فاطمة علي",
    position: "نائب مدير التطوير التقني",
    image: "/images/team/fatima.jpg",
    description: "خبيرة في التطوير التقني والتحول الرقمي",
  },
  {
    name: "المهندس محمود حسن",
    position: "مدير الأمن السيبراني",
    image: "/images/team/mahmoud.jpg",
    description: "متخصص في أمن المعلومات والحماية السيبرانية",
  },
  {
    name: "الأستاذة نور الدين",
    position: "مديرة خدمة العملاء",
    image: "/images/team/nour.jpg",
    description: "خبرة واسعة في إدارة خدمة العملاء والعلاقات العامة",
  },
];

export const selectOptions: Record<string, string[]> = {
  gendor: ["ذكر", "أنثى"],
  nationality: ["مصر", "السعودية", "الأردن", "الإمارات", "سوريا", "اليمن"],
  city: ["القاهرة", "الإسكندرية", "الجيزة", "المنصورة", "أسيوط"],
};

export const fieldLabels: Record<string, string> = {
  firstName: "الاسم الأول",
  secondName: "الاسم الثاني",
  thirdName: "الاسم الثالث",
  lastName: "الاسم الأخير",
  nationalNo: "الرقم القومي",
  dateOfBirth: "تاريخ الميلاد",
  gendor: "النوع",
  address: "العنوان",
  nationality: "الجنسية",
  city: "المدينة",
  phone: "رقم الهاتف",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  confirmPassword: "تأكيد كلمة المرور",
};
