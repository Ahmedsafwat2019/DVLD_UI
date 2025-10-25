"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          (pathname.includes(link.href) && link.href.length > 1) ||
          pathname === link.href;
        return isMobileNav ? (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              isActive
                ? "bg-gray-100 text-primary"
                : "hover:bg-gray-100  hover:text-primary ",
              " transition-colors rounded-lg p-4 flex items-center gap-3"
            )}
          >
            {link.icon} <p className="text-lg font-medium">{link.label}</p>
          </Link>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              isActive
                ? "bg-gray-200 text-primary"
                : "hover:bg-gray-200  hover:text-primary",
              "lg:text-lg font-medium p-4  duration-300 rounded-lg lg:min-w-32 text-center transition-colors"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
