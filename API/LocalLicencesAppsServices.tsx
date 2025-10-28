// services/payPalService.ts
import { promises } from "dns";
import { ApiClient } from "./GeneralApi";
import { LocalDrivingLicenseApplication } from "@/types/localDrivingLicenceViewType";
import { testAppointsment } from "@/types/testAppointment";

const apiClient = new ApiClient(
  "http://localhost:5240/api/LocalDrivingLicencesApps/ChangeStatus",
);

export const ChangeStatus = async (id): Promise<any> => {
  return await apiClient.post<any>(`/${id}`);
};
/*
export const Add = async (data:testAppointsment) :Promise<any> =>{
  return apiClient.post("/Add",data)
}
  */
