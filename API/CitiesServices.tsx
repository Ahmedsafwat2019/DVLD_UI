import { env } from "@/constants/env";
import { ApiClient } from "./GeneralApi";
import type { City } from "@/types";

const apiClient = new ApiClient(`${env.BASE_URL}/Cities`);

export const GetByCountry = async (id: any) => {
  return apiClient.get<City[]>(`/GetByCountry/${id}`);
};
