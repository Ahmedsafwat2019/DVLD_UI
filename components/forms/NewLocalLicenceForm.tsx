"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import ROUTES from "@/constants/routes";
import { LocalLicenceSchema } from "@/lib/validation";
import { selectOptions } from "@/constants";
import { ConfirmDialog } from "../Dialog";
import { useEffect } from "react";
import { api } from "@/lib/api";
import type { LicenseClass } from "@/types";

const NewLocalLicenceForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [licenseClasses, setLicenseClasses] = useState<LicenseClass[]>([]);

  const form = useForm({
    resolver: zodResolver(LocalLicenceSchema),
    defaultValues: { licenseClassId: "" },
  });

  const handleSubmit = async (data: { licenseClassId: string }) => {
    try {
      // Mock API call
      const result = {
        success: true,
        status: 200,
        message: "تم حفظ الترخيص بنجاح",
      };

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        router.push(ROUTES.HOME);
      } else {
        toast.error(`حدث خطأ: ${result.status}`, {
          description: result.message || "حدث خطأ غير متوقع",
        });
      }
    } catch {
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };

  const fetchLicenceClasses = async () => {
    try {
      const result = await api.licenseClasses.getAll();
      if (result.success && result.data) {
        setLicenseClasses(result.data as LicenseClass[]);
      }
    } catch {
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };
  console.log(licenseClasses);
  useEffect(() => {
    fetchLicenceClasses();
  }, []);

  return (
    <section
      className={cn(
        "bg-light-800 border light-border rounded-md px-4 py-10 shadow-md w-full max-w-4xl sm:px-8"
      )}
    >
      <div dir="rtl">
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-dark-gray mb-6">
          اختيار فئة الرخصة
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="licenseClassId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      dir="rtl"
                    >
                      <SelectTrigger className="min-h-12 rounded-md px-3 py-2 border-blue-2 w-full">
                        <SelectValue placeholder="اختر فئة الرخصة" />
                      </SelectTrigger>
                      <SelectContent className="w-[200px] sm:w-[300px]">
                        {selectOptions.licenseClassId?.map((option: string) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="mr-2"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="primary-gradient min-h-12 w-full rounded-md px-4 py-3 font-inter text-lg"
              onClick={() => {
                const val = form.getValues("licenseClassId");
                if (!val || val.trim() === "") {
                  toast.error("الرجاء اختيار فئة الرخصة أولاً");
                  return;
                }
                setOpen(true);
              }}
            >
              حفظ
            </Button>

            <ConfirmDialog
              open={open}
              onOpenChange={setOpen}
              description="هل أنت متأكد أنك تريد إرسال طلب الرخصة؟"
              loading={form.formState.isSubmitting}
              onConfirm={form.handleSubmit(handleSubmit)}
              onCancel={() => setOpen(false)}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default NewLocalLicenceForm;
