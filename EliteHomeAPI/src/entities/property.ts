interface PropertyProps {
  name: string;
  totalValue: number;
  numberOfRooms: number;
  city: string;
  state: string;
  size: string;
}

//TODO definir todos os atributos da entidade Property
export class Property {
  public name: string;
  public totalValue: number;
  public numberOfRooms: number;
  public city: string;
  public state: string;
  public size: string;

  constructor({
    name,
    city,
    numberOfRooms,
    size,
    state,
    totalValue,
  }: PropertyProps) {
    this.name = name;
    this.city = city;
    this.numberOfRooms = numberOfRooms;
    this.size = size;
    this.state = state;
    this.totalValue = totalValue;
  }
}
