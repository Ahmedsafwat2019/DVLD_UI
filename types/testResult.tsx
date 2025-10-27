import { string } from "zod";

export interface testResult {
  testAppointmentId: string;
  testResult: string;
  notes?: string;
}
