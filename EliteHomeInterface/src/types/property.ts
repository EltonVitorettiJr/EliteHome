export const propertyType = {
  APARTMENT: "APARTMENT",
  HOUSE: "HOUSE",
  TOWNHOUSE: "TOWNHOUSE",
  STUDIO: "STUDIO",
} as const;

export type PropertyType = (typeof propertyType)[keyof typeof propertyType];

export interface SearchPropertiesFilter {
  isRent: boolean,
  totalValue: boolean,
  rentValue: boolean,
  minValue: number,
  maxValue: number,
  propertyType: PropertyType[],
  minRooms: number,
  garageSlots: number,
  minBathrooms: number,
  minArea: number,
  maxArea: number,
}
