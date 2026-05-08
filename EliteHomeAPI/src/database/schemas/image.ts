import { Image } from "../../entities/image";

interface ImageProps {
  id?: string;
  property_id: string;
  url: string;
  created_at?: Date;
  updated_at?: Date;
}

export class ImageSchema {
  public id?: string;
  public property_id: string;
  public url: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor({ created_at, updated_at, id, property_id, url }: ImageProps) {
    this.id = id;
    this.property_id = property_id;
    this.url = url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toEntity() {
    const { created_at, updated_at, id, property_id, url } = this;

    return new Image({
      id,
      property_id,
      url: url,
      created_at,
      updated_at,
    });
  }
}
