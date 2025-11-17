// services/payPalService.ts
import { ApiClient } from "./GeneralApi";
import { country } from "@/types/country";

const apiClient = new ApiClient("/Countries");

export const GetAll = async () => {
  return apiClient.get<country[]>("/Get");
};
