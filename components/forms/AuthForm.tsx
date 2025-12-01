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
import type { ActionResponse, Country } from "@/types";
import { isValidDate, formatDate, cn, formatToISODate } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { fieldLabels } from "@/constants";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T, any>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}
interface SelectOptions {
  gendor: { id: string; name: string }[];
  nationality: Country[];
  city: any[];
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  const [selectOptions, setSelectOptions] = useState<SelectOptions>({
    gendor: [
      { id: "male", name: "male" },
      { id: "female", name: "female" },
    ],
    nationality: [],
    city: [],
  });

  const fetchCountries = async () => {
    try {
      const response = await api.countries.getAll();
      const data = await response.json();
      if (!data.success) throw new Error("Failed to fetch countries");
      setSelectOptions((prev) => ({
        ...prev,
        nationality: data.data as Country[],
      }));
    } catch (error) {
      console.error("Error fetching countries:", error);
      // handle error state here
    }
  };

  const fetchCitiesByCountry = async (countryId: string) => {
    try {
      const response = await api.cities.getByCountryId(countryId);
      const data = await response.json();
      if (!data.success) throw new Error("Failed to fetch cities");
      setSelectOptions((prev) => ({
        ...prev,
        city: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      // handle error state here
    }
  };

  const handleCountryChange = (value: string, field: any) => {
    field.onChange(value);

    if (value) {
      fetchCitiesByCountry(value);
    } else {
      setSelectOptions((prev) => ({
        ...prev,
        city: [],
      }));
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: formatToISODate(data.dateOfBirth),
    };

    const result = (await onSubmit(formattedData as T)) as ActionResponse;
    console.log(result);

    if (result?.success) {
      toast.success("تم بنجاح", {
        description:
          formType === "SIGN_IN"
            ? "تم تسجيل الدخول بنجاح"
            : "تم إنشاء الحساب بنجاح",
      });

      // Refresh authentication state after successful login or signup
      await new Promise((resolve) => setTimeout(resolve, 100));
      await refreshAuth();

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
        `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-10 shadow-xl rounded-2xl max-w-4xl sm:px-8`,
        isSignIn
          ? "sm:min-w-[520px]"
          : "min-w-full md:min-w-2xl lg:min-w-4xl xl:min-w-5xl"
      )}
    >
      <div
        dir="rtl"
        className={cn(`mx-auto`, isSignIn ? "max-w-md" : "max-w-4xl")}
      >
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-8">
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
                    <FormItem className="flex w-full flex-col gap-2.5">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {label}
                      </FormLabel>
                      <FormControl>
                        {isSelect ? (
                          <Select
                            onValueChange={(value) =>
                              name === "nationality"
                                ? handleCountryChange(value, field)
                                : field.onChange(value)
                            }
                            defaultValue={field.value}
                            dir="rtl"
                          >
                            <SelectTrigger className="min-h-12 rounded-lg px-4 py-3 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:border-brand-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 transition-all duration-200">
                              <SelectValue placeholder={`اختر ${label}`} />
                            </SelectTrigger>
                            <SelectContent className="w-[100px] sm:w-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                              {name === "city" &&
                              selectOptions.city.length === 0 ? (
                                <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                                  اختر الجنسية اولا
                                </div>
                              ) : (
                                selectOptions[name as keyof SelectOptions]?.map(
                                  (option: any) => (
                                    <SelectItem
                                      key={option.id || option.Id}
                                      value={option.id || option.Id}
                                      className="w-full"
                                    >
                                      {name === "city"
                                        ? option.cityEName || option.CityEName
                                        : option.countryEName || option.name}
                                    </SelectItem>
                                  )
                                )
                              )}
                            </SelectContent>
                          </Select>
                        ) : isDate ? (
                          <div className="relative flex items-center gap-2">
                            <Input
                              dir="ltr"
                              id="date"
                              value={field.value || value}
                              placeholder="June 01, 2025"
                              className="bg-white dark:bg-gray-700 pr-10 px-4 py-3 min-h-12 w-full rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-brand-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 transition-all duration-200"
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
                                  className="absolute top-1/2 right-3 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors size-8 -translate-y-1/2"
                                >
                                  <CalendarIcon className="size-4 text-gray-500 dark:text-gray-400" />
                                  <span className="sr-only">Select date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[220px] p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
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
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="terms"
                              className="m-0"
                            />
                            <Label
                              htmlFor="terms"
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              الموافقة على الشروط والأحكام
                            </Label>
                          </div>
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
                            placeholder={`أدخل ${label}`}
                            className={cn(
                              "min-h-12 px-4 py-3 rounded-lg text-base bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border transition-all duration-200",
                              form.formState.errors[name]
                                ? "border-error-500 hover:border-error-600 focus:border-error-500 focus:ring-2 focus:ring-error-200 dark:focus:ring-error-800"
                                : "border-gray-300 dark:border-gray-600 hover:border-brand-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800"
                            )}
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
              className="min-h-12 w-full rounded-lg px-4 py-3 text-base font-semibold col-span-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:from-brand-500 dark:to-brand-600 dark:hover:from-brand-600 dark:hover:to-brand-700"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {isSignIn ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
                </span>
              ) : isSignIn ? (
                "تسجيل الدخول"
              ) : (
                "إنشاء حساب"
              )}
            </Button>

            <div className="col-span-2">
              {isSignIn ? (
                <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                  لا تملك حساباً؟{" "}
                  <Link
                    href={ROUTES.SIGN_UP}
                    className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline transition-colors"
                  >
                    إنشاء حساب جديد
                  </Link>
                </p>
              ) : (
                <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                  لديك حساب بالفعل؟{" "}
                  <Link
                    href={ROUTES.SIGN_IN}
                    className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline transition-colors"
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
