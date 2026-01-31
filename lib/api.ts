// import { fetch } from "./handlers/fetch";
"use client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5240/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const api = {
  account: {
    me: () =>
      fetch(`${API_BASE_URL}/account/me`, {
        headers: defaultHeaders,
        credentials: "include",
      }),
  },
  auth: {
    login: (data: { email: string; password: string }) =>
      fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }),
    logout: () =>
      fetch(`${API_BASE_URL}/auth/Logout`, {
        headers: defaultHeaders,
        credentials: "include",
      }),
    signup: (data: {
      nationalNo: string;
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      secondName: string;
      thirdName: string;
      lastName: string;
      dateOfBirth: string;
      gendor: string;
      address: string;
      phone: string;
      nationality: string;
      city: string;
    }) =>
      fetch(`${API_BASE_URL}/auth/addcitizen`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  cities: {
    getAll: () =>
      fetch(`${API_BASE_URL}/Cities/Get`, { headers: defaultHeaders }),
    getByCountryId: (id: string) =>
      fetch(`${API_BASE_URL}/Cities/GetByCountry/${id}`, {
        headers: defaultHeaders,
      }),
  },
  countries: {
    getAll: () =>
      fetch(`${API_BASE_URL}/Countries/Get`, { headers: defaultHeaders }),
  },
  localDrivingLicencesApps: {
    getAppViews: () =>
      fetch(`${API_BASE_URL}/LocalDrivingLicencesApps/GetAppViews`, {
        headers: defaultHeaders,
        credentials: "include",
      }),
    getAppViewByPersonID: () =>
      fetch(`${API_BASE_URL}/LocalDrivingLicencesApps/GetAppViewsByPersonID`, {
        headers: defaultHeaders,
        credentials: "include",
      }),
    deleteById: (id: string) =>
      fetch(`${API_BASE_URL}/LocalDrivingLicencesApps/Delete/${id}`, {
        method: "DELETE",
        headers: defaultHeaders,
        credentials: "include",
      }),
    changeStatus: ({ id, status }: { id: string; status: number }) =>
      fetch(`${API_BASE_URL}/LocalDrivingLicencesApps/ChangeStatus/${id}`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify({ status }),
      }),
  },
  licenseClasses: {
    getAll: () =>
      fetch(`${API_BASE_URL}/LicenceClasses/Get`, {
        headers: defaultHeaders,
        credentials: "include",
      }),
  },
  applications: {
    getAll: () =>
      fetch(`${API_BASE_URL}/applications/get`, { headers: defaultHeaders }),
    addLocal: (data: { licenseClassId: string; ApplicantPersonId: string }) =>
      fetch(`${API_BASE_URL}/Applications/AddLocal`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  ApplicationTypes: {
    getById: (id: string) =>
      fetch(`${API_BASE_URL}/ApplicationTypes/Get/${id}`, {
        headers: defaultHeaders,
      }),
  },
  persons: {
    getAll: () =>
      fetch(`${API_BASE_URL}/Persons/Get`, { headers: defaultHeaders }),
    getById: (id: string) =>
      fetch(`${API_BASE_URL}/Persons/Get/${id}`, { headers: defaultHeaders }),
  },
   paypal: {
    // إنشاء Order
    createOrder: (items: { applicationID: string; Name: string; Description: string; Price: number; Quantity: number }[]) =>
      fetch(`${API_BASE_URL}/PayPalPayment/CreateOrder`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify({ items }),
      }),

    // Capture Order بعد ما العميل يوافق على الدفع
    captureOrder: (orderId: string) =>
      fetch(`${API_BASE_URL}/PayPalPayment/CaptureOrder/${orderId}`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify({ orderId }),
      }),
  }
 };
