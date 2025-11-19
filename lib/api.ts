import { fetchHandler } from "./handlers/fetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5240/api";

export const api = {
  account: {
    me: () =>
      fetchHandler(`${API_BASE_URL}/account/me`, {
        credentials: "include",
        silentAuthErrors: true,
      }),
  },
  auth: {
    login: (data: { email: string; password: string }) =>
      fetchHandler(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetchHandler(`${API_BASE_URL}/auth/logout`, {
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
      fetchHandler(`${API_BASE_URL}/auth/addcitizen`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  cities: {
    getAll: () => fetchHandler(`${API_BASE_URL}/Cities/Get`),
    getByCountryId: (id: string) =>
      fetchHandler(`${API_BASE_URL}/Cities/GetByCountry/${id}`),
  },
  countries: {
    getAll: () => fetchHandler(`${API_BASE_URL}/Countries/Get`),
  },
  licenseClasses: {
    getAll: () =>
      fetchHandler(`${API_BASE_URL}/LicenceClasses/Get`, {
        credentials: "include",
      }),
  },
  applications: {
    getAll: () => fetchHandler(`${API_BASE_URL}/applications/get`),
    addLocal: (data: { licenseClassId: string; ApplicantPersonId: string }) =>
      fetchHandler(`${API_BASE_URL}/Applications/AddLocal`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      }),
  },
  persons: {
    getAll: () => fetchHandler(`${API_BASE_URL}/persons/get`),
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/persons/${id}`),
  },
};
