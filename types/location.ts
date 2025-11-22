/**
 * Location Types (Countries & Cities)
 */

export interface Country {
  Id: string;
  CurrentState?: number;
  countryEName: string;
}

export interface City {
  Id: string;
  CityEName?: string;
  cityEName: string;
  CountryID: string;
  countryId: string;
  CurrentState?: number;
  countryEName: string;
}
