/**
 * Person Types
 */

export interface Person {
  personID: string;
  nationalNo: string;
  fullName: string;
  gendor?: string;
  age?: number;
  phone?: string;
  country: string;
  city: string;
  currentState: number;
  createdDate?: string;
  createdBy?: string;
}
