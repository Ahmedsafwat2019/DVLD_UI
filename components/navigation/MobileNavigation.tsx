"use client";

import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { navLinks } from "@/constants";
import ROUTES from "@/constants/routes";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="القائمة">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetTitle className="hidden"></SheetTitle>
        <div className="mt-10 flex flex-col gap-6 text-right  ">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          <div className="mt-6 flex flex-col gap-3 border-t pt-6">
            <Link
              href={ROUTES.SIGN_IN}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              تسجيل الدخول
            </Link>
            <Link
              href={ROUTES.SIGN_UP}
              className={cn(buttonVariants(), "w-full text-white")}
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
