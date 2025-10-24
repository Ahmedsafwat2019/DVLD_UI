import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import ROUTES from "@/constants/routes";

const MobileHero = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] lg:hidden">
      <Image
        src="/images/traffic.jpg"
        alt="بوابة مرور مصر"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 px-4 text-center text-white">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl text-purple">
          مرحبا بكم فى الموقع الرسمى
          <br />
          لبوابة مرور مصر
        </h1>

        <p className="max-w-xl text-lg md:text-xl">
          تعرف على الخدمات المتاحة للمرور
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={ROUTES.HOME}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            اكتشف خدماتنا
          </Link>
          <Link
            href={ROUTES.HOME}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-white/10 backdrop-blur-sm hover:bg-white/20"
            )}
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
