import { type PropertyType, propertyType } from "../types/property";
import { formatValue } from "../utils/format-value";

interface PropertyCardProps {
  images: { id: string; url: string }[];
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
  images,
  address,
  numberOfRooms,
  propertyType,
  rentValue,
  size,
  totalValue,
}: PropertyCardProps) => {
  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            id: "placeholder",
            url: "https://placehold.co/600x400/e2e8f0/475569?text=Sem+Foto",
          },
        ];

  return (
    <section className="flex flex-col gap-2 text-md m-4 w-full">
      {/* 2. CONTAINER DO CARROSSEL 
          overflow-x-auto: Permite rolar para os lados
          snap-x snap-mandatory: Obriga a parada exata na imagem
          no-scrollbar: Aquela classe que criamos no CSS
      */}
      <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full">
        {displayImages.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Imagem ${index + 1} do imóvel.`}
            loading={index === 0 ? "eager" : "lazy"}
            // snap-center faz a foto "imantar" no meio da tela ao rolar
            className="w-full h-60 min-w-full object-cover snap-center"
          />
        ))}
      </div>

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
        <p>
          <strong>{size} m² -</strong>
        </p>
        <p>
          <strong>
            {numberOfRooms} {numberOfRooms === 1 ? "quarto" : "quartos"}
          </strong>
        </p>
      </div>
      <p>{address}</p>
    </section>
  );
};
