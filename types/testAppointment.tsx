import { boolean, number, string } from "zod";

export interface testAppointsment {
  TestTypeId: string;
  LocalDrivingLicenseApplicationId: string;
  AppointmentDate: string;
  PaidFees: number;
  IsLocked: boolean;
  RetakeTestApplicationId?: string;
}
