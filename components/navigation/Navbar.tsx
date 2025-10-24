import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className="bg-transparent sm:px-12">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-1 text-right md:flex-none">
          <Link href="/" className="text-xl font-bold">
            شعار
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-md font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/sign-up"
            className={cn(buttonVariants({ size: "sm" }), "text-white")}
          >
            إنشاء حساب
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
