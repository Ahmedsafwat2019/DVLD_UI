import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ROUTES from "@/constants/routes";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] bg-light-background">
      <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center space-y-6 px-8 text-right lg:px-16">
          <h1 className="text-3xl sm:text-5xl text-dark-gray  lg:text-6xl  font-bold text-center leading-tight tracking-tight mb-10">
            مرحبا بكم فى الموقع الرسمى
            <br />
            لبوابة مرور مصر
          </h1>
          <section className="flex flex-col gap-6 w-full justify-center items-center">
            <p className="max-w-xl text-xl sm:text-2xl  text-center text-muted-foreground ">
              تعرف على الخدمات المتاحة للمرور
            </p>

            <div className="flex gap-4 justify-between items-center">
              <Link
                href={ROUTES.HOME}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "text-white sm:w-48 sm:p-6"
                )}
              >
                اكتشف خدماتنا
              </Link>
              <Link
                href={ROUTES.HOME}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "sm:w-48 sm:p-6"
                )}
              >
                اتصل بنا
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Hero;
