import { ApiClient } from "./GeneralApi";
import { city } from "@/types/city";

const apiClient = new ApiClient("http://localhost:5240/api/Cities");

export const GetByCountry = async (id: any) => {
  return apiClient.get<city[]>(`/GetByCountry/${id}`);
};
