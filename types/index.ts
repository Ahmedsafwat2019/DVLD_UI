// Auth Types
export interface User {
  userName: string;
  userRole: string;
  personID?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

// Application Types
export type LocalDrivingLicenseApplication = {
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
};

// Person Types
export type Person = {
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
};

// Country Types
export interface Country {
  Id: string;
  CurrentState?: number;
  countryEName: string;
}

// City Types
export interface City {
  Id: string;
  CurrentState?: number;
  cityEName: string;
  countryId: string;
}

// License Types
export interface LicenseClass {
  id: string;
  className: string;
  classDescription: string;
  classFees: number;
  minimumAllowedAge: number;
}

// Test Types
export interface TestAppointment {
  id: string;
  testType: string;
  testDate: string;
  testTime: string;
  location: string;
  status: string;
}

export interface TestResult {
  id: string;
  testId: string;
  score: number;
  passed: boolean;
  testDate: string;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: {
    name: string;
    image: string;
    designation: string;
  };
  tags: string[];
  publishDate: string;
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight: string;
}

// Feature Types
export interface Feature {
  id: number;
  icon: string;
  title: string;
  paragraph: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
}

// Menu Types
export interface MenuItem {
  title: string;
  path?: string;
  submenu?: {
    title: string;
    path: string;
  }[];
}

// Common Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: any) => React.ReactNode;
}
