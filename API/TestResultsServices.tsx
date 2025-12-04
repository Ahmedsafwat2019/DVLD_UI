import type { TestResult } from "@/types";
import { ApiClient } from "./GeneralApi";

const apiClient = new ApiClient("${env.BASE_URL}/Tests");

export const AddNewResult = async (data: TestResult) => {
  try {
    console.log("Adding test appointment:", data);
    const response = await apiClient.post("/Add", data);
    console.log("Add appointment response:", response);
    return response;
  } catch (error) {
    console.error("Error adding test appointment:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add test result",
      data: null,
    };
  }
};
