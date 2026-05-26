import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { PropertyCard } from "../components/property-card";
import { api } from "../services/api";
import type { PropertyType } from "../types/property";

interface PublicPropertyProps {
  id: string;
  name: string;
  address: string;
  totalValue: number;
  numberOfRooms: number;
  rentValue: number;
  condoValue: number;
  taxValue: number;
  numberOfBathrooms: number;
  garageSlots: number;
  arePetsAllowed: boolean;
  isNextToSubway: boolean;
  isActive: boolean;
  isSale: boolean;
  isRent: boolean;
  isFurnished: boolean;
  size: number;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  description: string;
}

export const Properties = () => {
  const [publicProperties, setPublicProperties] = useState<
    PublicPropertyProps[]
  >([]);

  useEffect(() => {
    const fetchPublicProperties = async () => {
      const response = await api.get("/properties");

      setPublicProperties(response.data);
    };

    fetchPublicProperties();
  }, []);

  return (
    <div>
      <Header />
      <div className="px-4">
        <p className="text-xl mb-1.5">
          <strong>09 casas e apartamentos encontrados</strong>
        </p>
        <p className="text-md">para alugar em Setor Marista, Goiânia/GO</p>
      </div>
      <div className="flex flex-wrap gap-6">
        {publicProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};
