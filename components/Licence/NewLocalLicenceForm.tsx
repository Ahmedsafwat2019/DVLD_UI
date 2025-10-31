"use client";
import { ZodError } from "zod";
import { LocalLicenceSchema } from "@/lib/validation";
import { LicenseClass } from "@/types";
import { useState, useEffect, use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LicenceCard from "../../components/Licence/myLicenceCard";
const NewLocalLicenceForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    licenseClassId: "",
    ApplicantPersonId: "",
  });
  const [licenseClasses, setlicenseClasses] = useState<LicenseClass[]>([]);
  const [errors, setErrors] = useState({
    licenseClassId: "",
  });
  const [hasMounted, setHasMoubted] = useState(false);
  const [showlicenceCard, setShowLicenceCard] = useState(false);
  const [licenceCardDetails, setLicenceCardDetails] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  useEffect(() => {
    setHasMoubted(true);
  }, []);
  // get all licences classes
  useEffect(() => {
    const LicencesClassesFetching = async () => {
      try {
        const result = await fetch(
          `http://localhost:5240/api/LicenceClasses/Get`,
          {
            credentials: "include",
          },
        );
        const JsonResult = await result.json();
        console.log("API Response:", JsonResult);
        if (JsonResult.data && Array.isArray(JsonResult.data)) {
          setlicenseClasses(JsonResult.data);
          console.log(
            "License classes loaded:",
            JsonResult.data.length,
            "classes",
          );
        } else {
          console.error("Invalid API response format:", JsonResult);
        }
      } catch (err) {
        console.error("Error fetching license classes:", err);
      }
    };
    LicencesClassesFetching();
  }, []);
  const validateField = (fieldName:any, value:any) => {
    try {
      LocalLicenceSchema.pick({ [fieldName]: true }).parse({
        [fieldName]: value,
      });
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErrors = err.issues;
        setErrors((prev) => ({
          ...prev,
          [fieldName]: zodErrors[0]?.message || "Invalid input",
        }));
      } else {
        console.error("Unexpected error during validation:", err);
        setErrors((prev) => ({ ...prev, [fieldName]: "Unknown error" }));
      }
    }
  };
  function validateForm() {
    try {
      LocalLicenceSchema.parse(formData);
      setErrors({
        licenseClassId: "",
      });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {} as Record<string, string>;

        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors((prev) => ({
          ...prev,
          ...fieldErrors,
        }));
      }
      return false;
    }
  }
  function handleSubmitClick() {
    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }
    setShowConfirmDialog(true);
  }
  async function HandeleSubmitForm() {
    // console.log(`personID is ${personID}`)
    console.log(`form data is ${formData}`);
    if (!validateForm()) {
      console.log("Form has errors ");
      return;
    }
    console.log("Form is valid ", formData);
    try {
      const payload = {
        ...formData,
        ApplicantPersonId: isAuthenticated ? user?.personID : "",
      };

      console.log(formData);
      alert(`I will fetch data ${formData}`);
      const response = await fetch(
        "http://localhost:5240/api/Applications/AddLocal",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );
      let data: any = null;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      if (!response.ok) {
        console.error("Server returned an error:", data);
        alert(`Error: ${JSON.stringify(data)}`);
        //  setDialogTitle("فشل ❌");
        //     setDialogBody(data?.message || "An error occurred.");
        //     setDialogOpen(true);
      } else {
        console.log("Success:", data);
        alert("Form submitted successfully!");
        // setDialogTitle("تم بنجاح ✅");
        // setDialogBody("Citizen added successfully!");
        // setDialogOpen(true);
      }
    } catch (err) {
      console.log("network connection error occured", err);
      console.error("Network error occurred", err);
      // setDialogTitle("خطأ ⚠️");
      // setDialogBody(`Unexpected error: ${err}`);
      // setDialogOpen(true);
      alert(`"unexpected error : ${err}`);
    }
  }
  function HadleLicenceClassChange(e:any) {
    {
      setFormData({ ...formData, licenseClassId: e.target.value });
      const selectedLicence = licenseClasses.find(
        (c) => c.id = e.target.value,
      );
      console.log("All license classes:", licenseClasses);
      console.log("Selected license:", selectedLicence);

      if (selectedLicence) {
        const cardDetails = {
          className: selectedLicence.className,
          classDescription: selectedLicence.classDescription,
          classFees: selectedLicence.classFees,
          minimumAllowedAge: selectedLicence.minimumAllowedAge,
        };
        console.log("Setting card details:", cardDetails);
        setLicenceCardDetails(cardDetails);
        setShowLicenceCard(true);
      } else {
        console.log("No license selected, hiding card");
        setShowLicenceCard(false);
        // setLicenceCardDetails(null);
      }
    }
  }
  return (
    <>
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark dark:bg-gray-800 border-gray-100 dark:border-gray-700 mx-auto max-w-[600px] rounded-xl border bg-white px-6 py-8 sm:p-8">
              <div className="mb-3 text-center">
                <h3 className="text-gray-800 mb-1 text-xl font-bold dark:text-white">
                  Select License Type
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Choose the type of license you want to apply for
                </p>
              </div>
              <form>
                <div className="InputField mb-4">
                  <label
                    htmlFor="licenseClass"
                    className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-semibold"
                  >
                    License Class
                  </label>
                  <div className="relative">
                    <select
                      onBlur={(e) => {
                        validateField("licenseClassId", e.target.value);
                      }}
                      onChange={(e) => {
                        HadleLicenceClassChange(e);
                      }}
                      value={formData.licenseClassId}
                      name="licenseClassId"
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-4 text-base transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-800"
                    >
                      <option value="">-- Select License Class --</option>
                      {licenseClasses.map((licenceClass: any) => (
                        <option key={licenceClass.id} value={licenceClass.id}>
                          {licenceClass.className}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                  {showlicenceCard && licenceCardDetails && (
                    <LicenceCard licenceClass={licenceCardDetails} />
                  )}
                </div>
                <div className="mt-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmitClick();
                    }}
                    type="submit"
                    className="dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 flex w-full transform cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="dark:bg-gray-800 mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
                Confirm Application
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to submit your license application? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 rounded-lg border px-4 py-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfirmDialog(false);
                    HandeleSubmitForm();
                  }}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Confirm
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
