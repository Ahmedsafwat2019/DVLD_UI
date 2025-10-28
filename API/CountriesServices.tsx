// services/payPalService.ts
import { ApiClient } from "./GeneralApi";
import { country } from "@/types/country";

const apiClient = new ApiClient("http://localhost:5240/api/Countries");

export const GetAll = async () => {
  return apiClient.get<country[]>("/Get");
};
