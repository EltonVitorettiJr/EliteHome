// biome-ignore assist/source/organizeImports: <Falso positivo do Biome>
import { knex } from "..";
import type { Image } from "../../entities/image";
import { ImageSchema } from "../schemas/image";

export class PropertyImagesRepository {
  async countByPropertyId(propertyId: string): Promise<number> {
    const result = await knex("property_images")
      .where("property_id", propertyId)
      .count("* as count")
      .first();

    const countResult = result as { count: string | number };

    return Number(countResult?.count || 0);
  }

  async create(data: {
    propertyId: string;
    urlImage: string;
  }): Promise<Image[]> {
    const [image] = await knex<ImageSchema>("property_images")
      .insert({
        property_id: data.propertyId,
        url: data.urlImage,
      })
      .returning("*");

    const imageEntity = new ImageSchema(image as ImageSchema).toEntity();

    return [imageEntity];
  }
}
