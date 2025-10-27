"use client";
import Link from "next/link";
import SignUpSchema from "@/utilts/ValidationsSchemas";
import { useState, useEffect } from "react";
import { guid, json, z, ZodError } from "zod";
import { GetAll } from "../../../components/API/CountriesServices";
import { da } from "zod/v4/locales";
import { country } from "@/types/country";
import { city } from "@/types/city";
import { GetByCountry } from "@/components/API/CitiesServices";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: " ",
    secondName: " ",
    thirdName: " ",
    lastName: " ",
    nationalNo: " ",
    dateOfBirth: "",
    gendor: "",
    nationality: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [countries, setCountries] = useState<country[]>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectCountryID, setSelectedCountryID] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    lastName: "",
    nationalNo: "",
    dateOfBirth: "",
    gendor: "",
    nationality: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogBody, setDialogBody] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountries(countries);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch cities when nationality changes
  useEffect(() => {
    if (!formData.nationality) return;

    const fetchCities = async () => {
      try {
        const returnCities = await GetByCountry(formData.nationality);
        setCities(returnCities);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [formData.nationality]);

  // sending
  const validateField = (fieldName : any, value : any) => {
    try {
      if (fieldName === "confirmPassword") {
        if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, [fieldName]: "" }));
        }
        return;
      }

      SignUpSchema.pick({ [fieldName]: true }).parse({ [fieldName]: value });
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
      SignUpSchema.parse(formData);
      setErrors({
        firstName: "",
        secondName: "",
        thirdName: "",
        lastName: "",
        nationalNo: "",
        dateOfBirth: "",
        gendor: "",
        nationality: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
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
  async function HandeleSubmitForm() {
    if (!validateForm()) {
      console.log("Form has errors ");
      return;
    }
    console.log("Form is valid ", formData);
    try {
      const response = await fetch(
        "http://localhost:5240/api/auth/AddCitizen",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
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
        setDialogTitle("فشل ❌");
        setDialogBody(data?.message || "An error occurred.");
        setDialogOpen(true);
      } else {
        console.log("Success:", data);
        alert("Form submitted successfully!");
        setDialogTitle("تم بنجاح ✅");
        setDialogBody("Citizen added successfully!");
        setDialogOpen(true);
      }
    } catch (err) {
      console.log("network connection error occured", err);
      console.error("Network error occurred", err);
      setDialogTitle("خطأ ⚠️");
      setDialogBody(`Unexpected error: ${err}`);
      setDialogOpen(true);
      alert(`"unexpected error : ${err}`);
    }
  }
  return (
    <>
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark mx-auto w-full rounded-sm bg-white px-6 py-10 sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
              </h3>
              <p className="text-body-color mb-11 text-center text-base font-medium">
                It’s totally free and super easy
              </p>
              <form className="">
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="InputField">
                    <label
                      htmlFor="firstName"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      First Name{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("firstName", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                      }}
                      value={formData.firstName}
                      type="text"
                      name="firstName"
                      placeholder="Enter your full name"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="secondName"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Second Name{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("secondName", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          secondName: e.target.value,
                        });
                      }}
                      value={formData.secondName}
                      type="text"
                      name="secondName"
                      placeholder="Enter your full name"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.secondName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.secondName}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="thirdName"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Third Name{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("thirdName", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, thirdName: e.target.value });
                      }}
                      value={formData.thirdName}
                      type="text"
                      name="thirdName"
                      placeholder="Enter your full name"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.thirdName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.thirdName}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="lastName"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Last Name{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("lastName", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                      }}
                      value={formData.lastName}
                      type="text"
                      name="lastName"
                      placeholder="Enter your full name"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="nationalNumber"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      National Number{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("nationalNo", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          nationalNo: e.target.value,
                        });
                      }}
                      value={formData.nationalNo}
                      type="text"
                      name="nationalNo"
                      placeholder="Enter your national  number"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.nationalNo && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.nationalNo}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="dateOfBirth"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Date Of Birth{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("dateOfBirth", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        });
                      }}
                      value={formData.dateOfBirth}
                      type="date"
                      name="dateOfBirth"
                      placeholder="Enter your dateOfBirth"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="gendor"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Gender{" "}
                    </label>
                    <select
                      onBlur={(e) => {
                        validateField("gendor", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, gendor: e.target.value });
                      }}
                      value={formData.gendor}
                      name="gendor"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    >
                      <option>Male</option>
                      <option>FeMale</option>
                    </select>
                    {hasMounted && errors.gendor && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.gendor}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="nationality"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Nationality{" "}
                    </label>
                    <select
                      onBlur={(e) => {
                        validateField("nationality", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          nationality: e.target.value,
                        });
                      }}
                      value={formData.nationality}
                      name="nationality"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    >
                      <option>-- Select Country --</option>
                      {countries.map((country: any) => (
                        <option key={country.id} value={country.id}>
                          {country.countryEName}
                        </option>
                      ))}
                    </select>
                    {hasMounted && errors.nationality && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="city"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      City{" "}
                    </label>
                    <select
                      onBlur={(e) => {
                        validateField("city", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                      }}
                      value={formData.city}
                      name="city"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    >
                      <option value="">-- Select City --</option>
                      {cities.map((city: any) => (
                        <option key={city.id} value={city.id}>
                          {city.cityEName}
                        </option>
                      ))}
                    </select>
                    {hasMounted && errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="address"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Address{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("address", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                      }}
                      value={formData.address}
                      type="text"
                      name="address"
                      placeholder="Enter your phone"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="phone"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Phone{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("phone", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                      }}
                      value={formData.phone}
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="email"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Work Email{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("email", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      value={formData.email}
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="password"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Your Password{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("password", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                      value={formData.password}
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="InputField">
                    <label
                      htmlFor="confirmPassword"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Check Password{" "}
                    </label>
                    <input
                      onBlur={(e) => {
                        validateField("confirmPassword", e.target.value);
                      }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        });
                      }}
                      value={formData.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter your Password"
                      className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary rounded-xs outline-hidden w-full border border-stroke bg-[#f8f8f8] px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                    {hasMounted && errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  {/* <div className="InputField">
                    <label
                      htmlFor="imageURL"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                       Image URL{" "}
                    </label>
                    <input
                      type="file"
                      name="checkPassword"
                      placeholder="Enter your image"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                  </div>  */}
                </div>
                <div className="mb-8 flex">
                  <label
                    htmlFor="checkboxLabel"
                    className="text-body-color flex cursor-pointer select-none text-sm font-medium"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabel"
                        className="sr-only"
                      />
                      <div className="box border-body-color/20 mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded-sm border dark:border-white/10">
                        <span className="opacity-0">
                          <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                              fill="#3056D3"
                              stroke="#3056D3"
                              strokeWidth="0.4"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <span>
                      By creating account means you agree to the
                      <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Terms and Conditions{" "}
                      </a>
                      , and our
                      <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Privacy Policy{" "}
                      </a>
                    </span>
                  </label>
                </div>
                <div className="mb-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      HandeleSubmitForm();
                    }}
                    className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 rounded-xs flex w-full cursor-pointer items-center justify-center px-9 py-4 text-base font-medium text-white duration-300"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <p className="text-body-color text-center text-base font-medium">
                Already using Startup?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      /*
      {/* <ConfirmDialog 
        open={dialogOpen}
        title={dialogTitle}
         body={dialogBody}
          onClose={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}>
    </ConfirmDialog> */}
    </>
  );
};
export default SignupForm;
