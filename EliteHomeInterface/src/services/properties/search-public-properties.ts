import type { SearchPropertiesFilter } from "../../types/property";
import { api } from "../api";

export const searchPublicProperties = async (filters: SearchPropertiesFilter) => {
  const response = await api.get("/properties", { params: filters });

  return response;
};