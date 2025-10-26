import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNavigation from "./MobileNavigation";
import ROUTES from "@/constants/routes";
import NavLinks from "./NavLinks";

const Navbar = () => {
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

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
