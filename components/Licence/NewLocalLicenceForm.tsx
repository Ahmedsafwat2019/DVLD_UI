"use client";

import { LocalLicenceSchema } from "@/lib/validation";
import { LicenseClass } from "@/types";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ZodError } from "zod";
import { api } from "@/lib/api";
import LicenceCard from "./myLicenceCard";
import ROUTES from "@/constants/routes";

const NewLocalLicenceForm = () => {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    licenseClassId: "",
    ApplicantPersonId: "",
  });

  // UI state
  const [licenseClasses, setLicenseClasses] = useState<LicenseClass[]>([]);
  const [errors, setErrors] = useState({ licenseClassId: "" });
  const [hasMounted, setHasMounted] = useState(false);
  const [showLicenceCard, setShowLicenceCard] = useState(false);
  const [licenceCardDetails, setLicenceCardDetails] = useState<{
    className?: string;
    classDescription?: string;
    classFees?: number;
    minimumAllowedAge?: number;
  } | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Loading states
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (hasMounted && !isAuthLoading && !isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً", {
        description: "الرجاء تسجيل الدخول للمتابعة",
      });
      router.push(ROUTES.SIGN_IN);
    }
  }, [hasMounted, isAuthLoading, isAuthenticated, router]);

  // Fetch license classes
  useEffect(() => {
    const fetchLicenseClasses = async () => {
      try {
        setIsLoadingClasses(true);
        const response = await api.licenseClasses.getAll();

        if (!response.success) {
          throw new Error(
            response.error?.message || "Failed to fetch license classes"
          );
        }

        if (response.data && Array.isArray(response.data)) {
          setLicenseClasses(response.data as LicenseClass[]);
        } else {
          console.error("Invalid API response format:", response);
          toast.error("خطأ في تحميل البيانات", {
            description: "تنسيق البيانات غير صحيح",
          });
        }
      } catch (error: any) {
        console.error("Error fetching license classes:", error);
        toast.error("فشل تحميل أنواع الرخص", {
          description: error.message || "حدث خطأ أثناء تحميل البيانات",
        });
      } finally {
        setIsLoadingClasses(false);
      }
    };

    if (isAuthenticated && !isAuthLoading) {
      fetchLicenseClasses();
    }
  }, [isAuthenticated, isAuthLoading]);

  const validateField = (fieldName: keyof typeof formData, value: string) => {
    try {
      if (fieldName === "licenseClassId") {
        LocalLicenceSchema.shape.licenseClassId.parse(value);
      }
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: err.issues[0]?.message || "Invalid input",
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    try {
      LocalLicenceSchema.parse(formData);
      setErrors({ licenseClassId: "" });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }
      return false;
    }
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user?.personID) {
      toast.error("خطأ في المصادقة", {
        description: "الرجاء تسجيل الدخول مرة أخرى",
      });
      router.push(ROUTES.SIGN_IN);
      return;
    }

    if (!validateForm()) {
      toast.error("خطأ في النموذج", {
        description: "الرجاء التحقق من البيانات المدخلة",
      });
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleSubmitForm = async () => {
    if (!isAuthenticated || !user?.personID) {
      toast.error("خطأ في المصادقة", {
        description: "الرجاء تسجيل الدخول مرة أخرى",
      });
      router.push(ROUTES.SIGN_IN);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        licenseClassId: formData.licenseClassId,
        ApplicantPersonId: user.personID,
      };

      const response = await api.applications.addLocal(payload);

      if (!response.success) {
        throw new Error(response.error?.message || "فشل إرسال الطلب");
      }

      toast.success("تم بنجاح", {
        description: "تم إرسال طلب الرخصة بنجاح",
      });

      // Reset form
      setFormData({ licenseClassId: "", ApplicantPersonId: "" });
      setShowLicenceCard(false);
      setLicenceCardDetails(null);

      // Redirect or show next steps
      router.push(ROUTES.HOME);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error("فشل إرسال الطلب", {
        description: error.message || "حدث خطأ غير متوقع",
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const handleLicenceClassChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    setFormData({ ...formData, licenseClassId: selectedId });

    if (!selectedId) {
      setShowLicenceCard(false);
      setLicenceCardDetails(null);
      return;
    }

    const selectedLicence = licenseClasses.find((c) => c.id === selectedId);

    if (selectedLicence) {
      const cardDetails = {
        className: selectedLicence.className,
        classDescription: selectedLicence.classDescription,
        classFees: selectedLicence.classFees,
        minimumAllowedAge: selectedLicence.minimumAllowedAge,
      };
      setLicenceCardDetails(cardDetails);
      setShowLicenceCard(true);
    } else {
      setShowLicenceCard(false);
      setLicenceCardDetails(null);
    }
  };

  // Don't render until mounted (prevents hydration issues)
  if (!hasMounted || isAuthLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand-600 dark:border-gray-700 dark:border-t-brand-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[600px]">
            <div className="shadow-three dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-xl border bg-white px-6 py-8 sm:p-8">
              <div className="mb-3 text-center">
                <h3 className="text-gray-800 mb-1 text-xl font-bold dark:text-white">
                  اختر نوع الرخصة
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  يرجى اختيار نوع الرخصة التي ترغب في التقديم عليها
                </p>
              </div>

              <form onSubmit={handleSubmitClick}>
                <div className="InputField mb-4">
                  <label
                    htmlFor="licenseClass"
                    className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-semibold"
                  >
                    فئة الرخصة
                  </label>
                  <div className="relative">
                    <select
                      id="licenseClass"
                      name="licenseClassId"
                      value={formData.licenseClassId}
                      onChange={handleLicenceClassChange}
                      onBlur={(e) =>
                        validateField("licenseClassId", e.target.value)
                      }
                      disabled={isLoadingClasses || isSubmitting}
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-4 text-base transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:border-brand-400 dark:focus:ring-brand-800"
                    >
                      <option value="">
                        {isLoadingClasses
                          ? "جاري التحميل..."
                          : "-- اختر فئة الرخصة --"}
                      </option>
                      {licenseClasses.map((licenceClass) => (
                        <option key={licenceClass.id} value={licenceClass.id}>
                          {licenceClass.className}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="text-gray-400 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {hasMounted && errors.licenseClassId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.licenseClassId}
                    </p>
                  )}

                  {showLicenceCard && licenceCardDetails && (
                    <LicenceCard licenceClass={licenceCardDetails} />
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoadingClasses}
                    className="dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 flex w-full transform cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-brand-700 hover:to-brand-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:from-brand-500 dark:to-brand-600 dark:hover:from-brand-600 dark:hover:to-brand-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>إرسال الطلب</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="dark:bg-gray-800 mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
                <svg
                  className="h-8 w-8 text-brand-600 dark:text-brand-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-2 text-lg font-semibold dark:text-white">
                تأكيد الطلب
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                هل أنت متأكد أنك تريد إرسال طلب الرخصة؟
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isSubmitting}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 rounded-lg border px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitForm}
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-500 dark:hover:bg-brand-600"
                >
                  {isSubmitting ? "جاري الإرسال..." : "تأكيد"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewLocalLicenceForm;
