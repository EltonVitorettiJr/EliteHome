export const propertyType = {
  APARTMENT: "APARTMENT",
  HOUSE: "HOUSE",
  TOWNHOUSE: "TOWNHOUSE",
  STUDIO: "STUDIO",
} as const;

export type PropertyType = (typeof propertyType)[keyof typeof propertyType];