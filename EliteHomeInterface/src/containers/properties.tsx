import { MapPin, SlidersHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { PropertyCard } from "../components/property-card";
import { SideBar } from "../components/side-bar";
import { api } from "../services/api";
import { searchPublicProperties } from "../services/properties/search-public-properties";
import type { PropertyType, SearchPropertiesFilter } from "../types/property";

export interface PublicPropertyProps {
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
  images: { id: string; url: string }[];
  propertyType: PropertyType;
  description: string;
}

export const Properties = () => {
  const [publicProperties, setPublicProperties] = useState<
    PublicPropertyProps[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPublicProperties = async () => {
      const response = await api.get("/properties");

      setPublicProperties(response.data);
    };

    fetchPublicProperties();
  }, []);

  const handleFilterProperties = async (filters: SearchPropertiesFilter) => {
    const response = await searchPublicProperties(filters);

    setPublicProperties(response.data);
  };

  return (
    <div>
      <Header />

      <div className="px-2 py-3 flex justify-between items-center border border-gray-200 mx-4">
        <MapPin size={26} />
        <span className="text-lg">Localização</span>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <SlidersHorizontalIcon size={26} />
        </button>
      </div>
      <SideBar
        className={`md:block ${isOpen ? "absolute" : "hidden"}`}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onFilter={handleFilterProperties}
      />

      <div className="px-4 mt-3">
        <p className="text-xl mb-1.5">
          <strong>
            {publicProperties.length > 9
              ? publicProperties.length
              : `0${publicProperties.length}`}{" "}
            casas e apartamentos encontrados
          </strong>
        </p>
        <p className="text-md">para alugar em Setor Marista, Goiânia/GO</p>
      </div>
      <div className="flex flex-wrap">
        {publicProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};
