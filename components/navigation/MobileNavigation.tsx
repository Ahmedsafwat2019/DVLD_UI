"use client";
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
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";

const MobileNavigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

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
      <SheetContent className="min-w-full">
        <SheetTitle className="hidden"></SheetTitle>
        <div className="mt-10 flex flex-col gap-6 text-right  ">
          <NavLinks isMobileNav />

          {isAuthenticated ? (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 p-4  bg-blue-50  rounded-xl  mb-4 transition-all duration-300 hover:shadow-md ">
                <Avatar className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {/* for test  */}
                  {user?.userName?.charAt(0)?.toUpperCase() || "ر"}
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-gray-800 font-medium text-sm">
                    {/* for test */}
                    أهلاً، {user?.userName || "رشاد حسين"}
                  </p>
                  <span className="text-xs text-gray-500">
                    مرحباً بعودتك 👋
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={logout}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl 
             border border-transparent text-red-600 font-medium p-6
             transition-all duration-200 ease-in-out
             hover:bg-red-50 hover:text-red-700 hover:border-red-100
             active:scale-[0.98] active:bg-red-100"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">تسجيل الخروج</span>
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
