import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ROUTES from "@/constants/routes";
import MobileHero from "./MobileHero";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-white">
      <MobileHero />

      <div className="hidden min-h-[calc(100vh-4rem)] lg:grid lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center space-y-6 gap-6 px-8 text-right lg:px-16">
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl mb-10">
            مرحبا بكم فى الموقع الرسمى
            <br />
            لبوابة مرور مصر
          </h1>
          <section className="flex flex-col gap-4">
            <p className="max-w-xl text-xl text-muted-foreground">
              تعرف على الخدمات المتاحة للمرور
            </p>

            <div className="flex gap-4">
              <Link
                href={ROUTES.HOME}
                className={cn(buttonVariants({ size: "lg" }), "text-white")}
              >
                اكتشف خدماتنا
              </Link>
              <Link
                href={ROUTES.HOME}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                اتصل بنا
              </Link>
            </div>
          </section>
        </div>

        <section className="relative h-full min-h-[calc(100vh-4rem)] overflow-hidden">
          <Image
            src="/images/traffic.jpg"
            alt="بوابة مرور مصر"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </section>
      </div>
    </section>
  );
};

export default Hero;
