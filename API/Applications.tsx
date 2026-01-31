import { env } from "@/constants/env";
import { ApiClient } from "./GeneralApi";
import  { LocalDrivingLicenseApplication } from "@/types";

const apiClient = new ApiClient(`${env.BASE_URL}/LocalDrivingLicencesApps`);

export const GetApplicationsByPersonID = async (id: any) => {
  return apiClient.get<LocalDrivingLicenseApplication[]>(`/GetAppViewsByPersonID`);
};
