"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          (pathname.includes(link.href) && link.href.length > 1) ||
          pathname === link.href;
        return isMobileNav ? (
          <SheetClose asChild>
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                isActive
                  ? " text-primary border-r-4 border-primary"
                  : "hover:text-primary  hover:border-r-4 border-primary ",
                " transition-all duration-75 rounded-sm p-4 flex items-center gap-3"
              )}
            >
              {link.icon} <p className="text-lg font-medium">{link.label}</p>
            </Link>
          </SheetClose>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              isActive ? "text-primary  " : " hover:text-primary",
              "font-medium p-3  duration-300  text-center transition-colors"
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
