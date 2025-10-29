"use client";

import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types";
import { isValidDate, formatDate, cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { fieldLabels, selectOptions } from "@/constants";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T, any>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success("تم بنجاح", {
        description:
          formType === "SIGN_IN"
            ? "تم تسجيل الدخول بنجاح"
            : "تم إنشاء الحساب بنجاح",
      });
      router.push(ROUTES.HOME);
    } else {
      toast.error(`حدث خطأ: ${result?.status}`, {
        description: result?.error?.message || "حدث خطأ غير متوقع",
      });
    }
  };

  const isSignIn = formType === "SIGN_IN";

  return (
    <section
      className={cn(
        `light-border bg-light-800 border px-4 py-10 shadow-md max-w-4xl sm:px-8`,
        isSignIn
          ? "sm:min-w-[520px]"
          : "min-w-full md:min-w-2xl lg:min-w-4xl xl:min-w-5xl"
      )}
    >
      <div
        dir="rtl"
        className={cn(`mx-auto`, isSignIn ? "max-w-md" : "max-w-4xl")}
      >
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-dark-gray mb-6">
          {isSignIn ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={cn(
              `space-y-6`,
              !isSignIn && "sm:grid grid-cols-2  gap-2"
            )}
          >
            {(Object.keys(defaultValues) as Array<keyof T>).map((key) => (
              <FormField
                key={key as string}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => {
                  const name = field.name;

                  const label = fieldLabels[name] || "";

                  // Check if field is a select dropdown
                  const isSelect = Object.keys(selectOptions).includes(name);
                  const isDate = name === "dateOfBirth";
                  const isAccepted = name === "terms";

                  return (
                    <FormItem className="flex w-full flex-col gap-2">
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        {isSelect ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            dir="rtl"
                          >
                            <SelectTrigger className="min-h-12 rounded-1.5 border px-3 py-2">
                              <SelectValue placeholder={`اختر ${label}`} />
                            </SelectTrigger>
                            <SelectContent className="w-[100px]">
                              {selectOptions[name].map((option) => (
                                <SelectItem
                                  key={option}
                                  value={option}
                                  className="w-full"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : isDate ? (
                          <div className="relative flex items-center gap-2 ">
                            <Input
                              dir="ltr"
                              id="date"
                              value={field.value || value}
                              placeholder="June 01, 2025"
                              className="bg-background pr-10 p-6 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                              onChange={(e) => {
                                const inputDate = new Date(e.target.value);
                                const formatted = formatDate(inputDate);
                                setValue(formatted);
                                field.onChange(formatted);
                                if (isValidDate(inputDate)) {
                                  setDate(inputDate);
                                  setMonth(inputDate);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                  e.preventDefault();
                                  setOpen(true);
                                }
                              }}
                            />
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  id="date-picker"
                                  variant="ghost"
                                  className="absolute top-1/2 right-2 flex items-center justify-center rounded-md  hover:bg-gray-100 transition-colors size-8 -translate-y-1/2"
                                >
                                  <CalendarIcon className="size-4 text-gray-500" />
                                  <span className="sr-only">Select date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[220px] p-3 bg-white rounded-xl  shadow-xl border border-gray-200"
                                align="end"
                                sideOffset={8}
                              >
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  captionLayout="dropdown"
                                  month={month}
                                  onMonthChange={setMonth}
                                  onSelect={(selectedDate) => {
                                    if (!selectedDate) return;
                                    const formatted = formatDate(selectedDate);
                                    setDate(selectedDate);
                                    setValue(formatted);
                                    field.onChange(formatted);
                                    setOpen(false);
                                  }}
                                  className="mx-auto rounded-md w-full"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        ) : isAccepted ? (
                          <FormField
                            control={form.control}
                            name={"terms" as Path<T>}
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-1 col-span-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="terms"
                                    className="m-0"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="terms"
                                  className="text-sm text-gray-700"
                                >
                                  الموافقة على الشروط والأحكام
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ) : (
                          <Input
                            type={
                              name === "password" || name === "confirmPassword"
                                ? "password"
                                : name === "email"
                                  ? "email"
                                  : "text"
                            }
                            {...field}
                            className="no-focus min-h-12 rounded-lg border px-3 py-2"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}

            <Button
              disabled={form.formState.isSubmitting}
              className="primary-gradient min-h-12 w-full rounded-2 px-4 py-3 font-inter cursor-pointer text-lg col-span-2"
            >
              {form.formState.isSubmitting
                ? isSignIn
                  ? "جاري تسجيل الدخول..."
                  : "جاري إنشاء الحساب..."
                : isSignIn
                  ? "تسجيل الدخول"
                  : "إنشاء حساب"}
            </Button>

            <div className="col-span-2">
              {isSignIn ? (
                <p className="text-center mt-4 text-gray-600">
                  لا تملك حساباً؟{" "}
                  <Link
                    href={ROUTES.SIGN_UP}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    إنشاء حساب جديد
                  </Link>
                </p>
              ) : (
                <p className="text-center mt-4 text-gray-600">
                  لديك حساب بالفعل؟{" "}
                  <Link
                    href={ROUTES.SIGN_IN}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
