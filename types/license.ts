/**
 * License & Application Types
 */

export interface LicenseClass {
  id: string;
  className: string;
  classDescription: string;
  classFees: number;
  minimumAllowedAge: number;
}

export interface LocalDrivingLicenseApplication {
  localDrivingLicenseApplicationId: string;
  applicationId: string;
  personID: string;
  nationalNum: string;
  fullName: string;
  age: number;
  gendor: "male" | "female" | "unknown";
  country: string;
  city: string;
  paidFees: number;
  className: string;
  currentState: number;
  createdBy: string | null;
  createdDate: string;
  updatedDate: string | null;
}
