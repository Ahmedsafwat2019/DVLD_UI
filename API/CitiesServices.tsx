import { env } from "@/constants/env";
import { ApiClient } from "./GeneralApi";
import { city } from "@/types/city";

const apiClient = new ApiClient(`${env.BASE_URL}/Cities`);

export const GetByCountry = async (id: any) => {
  return apiClient.get<city[]>(`/GetByCountry/${id}`);
};
