interface PropertyProps {
  id?: string | undefined;
  name: string;
  totalValue: number;
  numberOfRooms: number;
  city: string;
  state: string;
  size: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

//TODO definir todos os atributos da entidade Property
export class Property {
  public id?: string | undefined;
  public name: string;
  public totalValue: number;
  public numberOfRooms: number;
  public size: string;
  public city: string;
  public state: string;
  public createdAt?: Date | undefined;
  public updatedAt?: Date | undefined;

  constructor({
    id,
    name,
    city,
    numberOfRooms,
    size,
    state,
    totalValue,
    createdAt,
    updatedAt,
  }: PropertyProps) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.numberOfRooms = numberOfRooms;
    this.size = size;
    this.state = state;
    this.totalValue = totalValue;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
