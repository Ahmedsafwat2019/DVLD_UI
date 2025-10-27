import { number, string } from "zod";

export interface TestAppointmentsView {
  testAppointmentId: string;
  testTypeTitle: string;
  LocalDrivingLicenseApplicationID: string;
  appointmentDate: string;
  paidFees: number;
  isLocked: boolean;
  testResult?: string;
  notes?: string;
}
