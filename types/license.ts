/**
 * License & Application Types
 */

import { FileText } from "lucide-react";

export interface LicenseClass {
  id: string;
  className: string;
  classDescription: string;
  classFees: number;
  minimumAllowedAge: number;
}

/**
 * Application Status Enum
 */
export enum ApplicationStatus {
  New = 1,
  Approved = 2,
  Rejected = 3,
  Paid = 4,
  WaitingTest = 5,
  FailTest = 6,
  PassTest = 7,
  Completed = 8,
}
export interface StatusConfig {
  label: string;
  icon: typeof FileText;
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
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
  currentState: ApplicationStatus;
  createdBy: string | null;
  createdDate: string;
  updatedDate: string | null;
}

export interface ApplicationType {
  id: string;
  applicationTypeTitle: string;
  applicationFees: number;
  currentState: number;
}

export interface Application {
  id: string;
  applicantPersonId: string;
  applicationDate: string;
  applicationTypeId: string;
  applicationStatus: number;
  lastStatusDate: string;
  paidFees: number;
  createdByUserId: string;
  currentState: number;
}

export interface PersonDetails {
  id: string;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gendor: number;
  address: string;
  phone: string;
  nationalityCountryID: string;
  imagePath: string | null;
  cityID: string;
  currentState: number;
}

export interface ApplicationWithDetails extends Application {
  person?: PersonDetails;
  applicationType?: ApplicationType;
  licenseClass?: string;
}
