import { type PropertyType, propertyType } from "../types/property";
import { formatValue } from "../utils/format-value";

interface PropertyCardProps {
  propertyType: PropertyType;
  totalValue: number;
  rentValue: number;
  size: number;
  numberOfRooms: number;
  address: string;
}

const propertyTypeMap: Record<PropertyType, string> = {
  [propertyType.APARTMENT]: "Apartamento",
  [propertyType.HOUSE]: "Casa",
  [propertyType.TOWNHOUSE]: "Casa de Campo",
  [propertyType.STUDIO]: "Estudio",
};

export const PropertyCard = ({
  address,
  numberOfRooms,
  propertyType,
  rentValue,
  size,
  totalValue,
}: PropertyCardProps) => {
  return (
    <section className="flex flex-col gap-2 text-md m-4 w-full">
      <h2>{propertyTypeMap[propertyType]}</h2>
      <p className="text-lg">
        <strong>{formatValue(totalValue)}</strong>
      </p>
      {rentValue > 0 ? (
        <p>Aluguel: {formatValue(rentValue)}</p>
      ) : (
        <p>Não alugável</p>
      )}
      <div className="flex gap-2 mt-2">
        <p>{size} m² -</p>
        <p>
          {numberOfRooms} {numberOfRooms === 1 ? "quarto" : "quartos"}
        </p>
      </div>
      <p>{address}</p>
    </section>
  );
};
