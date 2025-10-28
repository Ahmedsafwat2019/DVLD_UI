// services/testAppointmentService.ts
import { ApiClient } from "./GeneralApi";
import { testAppointsment } from "@/types/testAppointment";
import { TestAppointmentsView } from "@/types/testAppointmentView";

const apiClient = new ApiClient("http://localhost:5240/api/TestAppointments");

export const getAllTestAppointments = async (): Promise<
  TestAppointmentsView[]
> => {
  try {
    console.log("Calling getAllTestAppointments API...");
    const response = await apiClient.get<TestAppointmentsView[]>("/GetViews");
    console.log("API Response:", response);

    // Handle different response structures
    if (Array.isArray(response)) {
      return response;
    } else if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("Unexpected response structure:", response);
      return [];
    }
  } catch (error) {
    console.error("Error in getAllTestAppointments:", error);
    throw error;
  }
};

export const addTestAppointment = async (data: testAppointsment) => {
  try {
    console.log("Adding test appointment:", data);
    const response = await apiClient.post("/AddNewAppointment", data);
    console.log("Add appointment response:", response);
    return response;
  } catch (error) {
    console.error("Error adding test appointment:", error);
    throw error;
  }
};
