import { BadgeInfoIcon } from "@/components/ui/icons/lucide-badge-info";
import { CarIcon } from "@/components/ui/icons/lucide-car";
import { HouseIcon } from "@/components/ui/icons/lucide-house";
import { SendHorizontalIcon } from "@/components/ui/icons/lucide-send-horizontal";

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
