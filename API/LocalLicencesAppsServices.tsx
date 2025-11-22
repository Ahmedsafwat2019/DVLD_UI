// services/payPalService.ts
import { promises } from "dns";
import { ApiClient } from "./GeneralApi";
import type { LocalDrivingLicenseApplication, TestAppointment } from "@/types";
import { env } from "@/constants/env";

const apiClient = new ApiClient(
  `${env.BASE_URL}/LocalDrivingLicencesApps/ChangeStatus`
);

export const ChangeStatus = async (id: string): Promise<any> => {
  return await apiClient.post<any>(`/${id}`);
};
/*
export const Add = async (data:testAppointsment) :Promise<any> =>{
  return apiClient.post("/Add",data)
}
  */
