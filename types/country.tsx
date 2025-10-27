import { number } from "zod";

export interface country {
  Id: string;
  CurrentState?: number;
  countryEName: string;
}
