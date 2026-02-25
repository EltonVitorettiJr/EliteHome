import type { Property } from "../entities/property";
import { properties } from "../http/controllers/properties/route";

export interface SearchPropertiesUseCaseReply {
  properties: Property[];
}

export class SearchPropertiesUseCase {
  execute(): SearchPropertiesUseCaseReply {
    return { properties };
  }
}
