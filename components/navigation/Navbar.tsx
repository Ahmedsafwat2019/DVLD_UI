"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNavigation from "./MobileNavigation";
import ROUTES from "@/constants/routes";
import NavLinks from "./NavLinks";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-white xl:px-12">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex-1 text-right lg:flex-none">
          <Link href={ROUTES.HOME} className="text-xl sm:text-2xl font-bold">
            شعار
          </Link>
        </div>

        <div className="hidden items-center gap-6 lg:flex w-fit flex-1 justify-center">
          <NavLinks />
        </div>

        {isAuthenticated ? (
          <div className="hidden lg:flex gap-3 justify-center items-center">
            <Avatar>
              <AvatarFallback>
                {user ? user?.userName.slice(0, 2) : "CN"}
              </AvatarFallback>
            </Avatar>

            <LogOut
              className="size-8 text-xl text-red-700 cursor-pointer hover:bg-red-50 transition-colors duration-300 p-1 rounded-sm"
              onClick={logout}
            />
          </div>
        ) : (
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={ROUTES.SIGN_IN}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              تسجيل الدخول
            </Link>
            <Link href={ROUTES.SIGN_UP} className={cn(buttonVariants())}>
              إنشاء حساب
            </Link>
          </div>
        )}

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
