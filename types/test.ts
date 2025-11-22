/**
 * Test & Appointment Types
 */

export interface TestAppointment {
  TestTypeId: string;
  LocalDrivingLicenseApplicationId: string;
  AppointmentDate: string;
  PaidFees: number;
  IsLocked: boolean;
  RetakeTestApplicationId?: string;
}

export interface TestAppointmentView {
  testAppointmentId: string;
  testTypeTitle: string;
  LocalDrivingLicenseApplicationID: string;
  appointmentDate: string;
  paidFees: number;
  isLocked: boolean;
  testResult?: string;
  notes?: string;
}

export interface TestResult {
  testAppointmentId: string;
  testResult: string;
  notes?: string;
}
