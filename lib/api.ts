// import { fetch } from "./handlers/fetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5240/api";

export const api = {
  account: {
    me: () =>
      fetch(`${API_BASE_URL}/account/me`, {
        credentials: "include",
      }),
  },
  auth: {
    login: (data: { email: string; password: string }) =>
      fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetch(`${API_BASE_URL}/auth/logout`, {
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
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  cities: {
    getAll: () => fetch(`${API_BASE_URL}/Cities/Get`),
    getByCountryId: (id: string) =>
      fetch(`${API_BASE_URL}/Cities/GetByCountry/${id}`),
  },
  countries: {
    getAll: () => fetch(`${API_BASE_URL}/Countries/Get`),
  },
  licenseClasses: {
    getAll: () =>
      fetch(`${API_BASE_URL}/LicenceClasses/Get`, {
        credentials: "include",
      }),
  },
  applications: {
    getAll: () => fetch(`${API_BASE_URL}/applications/get`),
    addLocal: (data: { licenseClassId: string; ApplicantPersonId: string }) =>
      fetch(`${API_BASE_URL}/Applications/AddLocal`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  persons: {
    getAll: () => fetch(`${API_BASE_URL}/persons/get`),
    getById: (id: string) => fetch(`${API_BASE_URL}/persons/${id}`),
  },
};
