// services/payPalService.ts
import { ApiClient } from "./GeneralApi";
import type { Country } from "@/types";

const apiClient = new ApiClient("/Countries");

export const GetAll = async () => {
  return apiClient.get<Country[]>("/Get");
};
