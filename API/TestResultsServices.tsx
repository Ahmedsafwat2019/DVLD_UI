import { testResult } from "@/types/testResult";
import { ApiClient } from "./GeneralApi";

const apiClient = new ApiClient("${env.BASE_URL}/Tests");

export const AddNewResult = async (data: testResult) => {
  try {
    console.log("Adding test appointment:", data);
    const response = await apiClient.post("/Add", data);
    console.log("Add appointment response:", response);
    return response;
  } catch (error) {
    console.error("Error adding test appointment:", error);
    throw error;
  }
};
