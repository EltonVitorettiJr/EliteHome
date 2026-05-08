export interface ImageProps {
  id?: string;
  property_id: string;
  url: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Image {
  public id?: string;
  public property_id: string;
  public url: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor({ id, property_id, url, created_at, updated_at }: ImageProps) {
    this.id = id;
    this.property_id = property_id;
    this.url = url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
