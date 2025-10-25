import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import Link from "next/link";
import { cn } from "@/lib/utils";

import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";
import { MenuIcon } from "../ui/icons/lucide-menu";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          aria-label="القائمة"
          className="lg:hidden h-12 w-12 p-0"
          style={{ width: "28px", height: "28px" }}
        >
          <MenuIcon style={{ width: "100%", height: "100%" }} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="hidden"></SheetTitle>
        <div className="mt-10 flex flex-col gap-6 text-right  ">
          <NavLinks isMobileNav />

          <div className="mt-6 flex flex-col gap-3 border-t pt-6">
            <Link
              href={ROUTES.SIGN_IN}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full p-6"
              )}
            >
              تسجيل الدخول
            </Link>
            <Link
              href={ROUTES.SIGN_UP}
              className={cn(buttonVariants(), "w-full text-white p-6")}
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
