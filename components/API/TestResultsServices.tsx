import { testResult } from "@/types/testResult";
import { ApiClient } from "../API/GeneralApi";

const apiClient = new ApiClient("http://localhost:5240/api/Tests");

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
