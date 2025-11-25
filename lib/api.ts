// import { fetch } from "./handlers/fetch";

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
          id: "00000000-0000-0000-0000-000000000000",
          currentState: 0,
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
  persons: {
    getAll: () =>
      fetch(`${API_BASE_URL}/Persons/Get`, { headers: defaultHeaders }),
    getById: (id: string) =>
      fetch(`${API_BASE_URL}/Persons/Get/${id}`, { headers: defaultHeaders }),
  },
};
