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
