import { XIcon } from "lucide-react";
import { type HTMLAttributes, useState } from "react";
import {
  type PropertyType,
  propertyType,
  type SearchPropertiesFilter,
} from "../types/property";
import { Button } from "./button";
import { InputNumber } from "./input-number";
import { propertyTypeMap } from "./property-card";

interface SideBarProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onFilter: (filters: SearchPropertiesFilter) => void;
}

interface QueryParamsTranslator {
  [key: string]: string | number | boolean | PropertyType[] | undefined;
}

export const SideBar = ({
  className,
  isOpen,
  setIsOpen,
  onFilter,
  ...props
}: SideBarProps) => {
  const roomOptions = [1, 2, 3, 4];
  const garageOptions = [0, 1, 2, 3, 4];
  const bathroomsOptions = [1, 2, 3, 4];
  const propertyTypeOptions = Object.values(propertyType);

  const ACTIVE_TAB_TYPES = {
    ALUGAR: "ALUGAR",
    COMPRAR: "COMPRAR",
  };

  const defaultFormValues = {
    // --- ESTADOS EXCLUSIVOS DA TELA (UI Helpers) ---
    isRent: true,
    totalValue: true,
    rentValue: false,
    minValue: 500,
    maxValue: 20000,

    // --- ESTADOS COMPARTILHADOS (Nomes exatos do Backend) ---
    propertyType: [] as PropertyType[],
    minRooms: 3, // 🌟 Corrigido (era numberOfRooms)
    minBathrooms: 2, // 🌟 Corrigido (era numberOfBathrooms)

    // --- 🚨 CAMPOS FANTASMAS (Estão no Front, mas faltam no Zod) ---
    garageSlots: 2,
    minArea: 20,
    maxArea: 1000,
  };

  const [activeTab, setActiveTab] = useState<string>(ACTIVE_TAB_TYPES.ALUGAR);
  const [formData, setFormData] =
    useState<SearchPropertiesFilter>(defaultFormValues);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === ACTIVE_TAB_TYPES.COMPRAR) {
      setFormData({
        ...formData,
        isRent: false,
        totalValue: false,
        rentValue: false,
      });
    } else {
      setFormData({ ...formData, isRent: true, totalValue: true });
    }
  };

  const handleClear = () => {
    setFormData(defaultFormValues);
  };

  const handleSubmit = async () => {
    const queryParams: QueryParamsTranslator = {
      isRent: formData.isRent,
      minRooms: formData.minRooms > 0 ? formData.minRooms : undefined,
      minBathrooms:
        formData.minBathrooms > 0 ? formData.minBathrooms : undefined,
      propertyType:
        formData.propertyType.length > 0 ? formData.propertyType : undefined,
    };

    // Traduzimos os checkboxes de preço para o formato da API
    if (formData.totalValue) {
      queryParams.maxTotalValue = formData.maxValue;
    } else if (formData.rentValue) {
      queryParams.maxRentValue = formData.maxValue;
    }

    onFilter(formData);

    setIsOpen(false);
  };

  return (
    <form className={`${className} bg-base-white top-0`} {...props}>
      <div className="flex justify-end items-center px-4 py-2">
        <button type="button" onClick={() => setIsOpen(false)}>
          <XIcon size={26} />
        </button>
      </div>

      {/* RENT OR BUY */}

      <fieldset className="flex gap-4 px-4 py-2">
        <button
          type="button"
          onClick={() => handleTabClick(ACTIVE_TAB_TYPES.ALUGAR)}
          className={`text-xl
            ${
              activeTab === ACTIVE_TAB_TYPES.ALUGAR
                ? "font-bold text-base-black-blue border-b-2 border-base-black-blue"
                : ""
            }
          `}
        >
          Alugar
        </button>
        <button
          type="button"
          onClick={() => handleTabClick(ACTIVE_TAB_TYPES.COMPRAR)}
          className={`text-xl
            ${
              activeTab === ACTIVE_TAB_TYPES.COMPRAR
                ? "font-bold text-base-black-blue border-b-2 border-base-black-blue"
                : ""
            }
          `}
        >
          Comprar
        </button>
      </fieldset>

      {/* TOTAL VALUE AND PARCIAL RENT VALUE */}

      <div className="px-4 mt-4 flex flex-col gap-2">
        {activeTab === ACTIVE_TAB_TYPES.ALUGAR && (
          <div className="flex flex-col gap-2 items-start">
            <h3 className="font-bold text-base-black-blue text-md">Valor</h3>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.totalValue}
                onChange={() => {
                  setFormData({
                    ...formData,
                    // Inverte o próprio valor
                    totalValue: !formData.totalValue,
                    // Força o outro a desmarcar para evitar conflito
                    rentValue: false,
                  });
                }}
                id="totalValue"
              />
              <label htmlFor="totalValue">Valor Total</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.rentValue}
                onChange={() => {
                  setFormData({
                    ...formData,
                    // Inverte o próprio valor
                    rentValue: !formData.rentValue,
                    // Força o outro a desmarcar para evitar conflito
                    totalValue: false,
                  });
                }}
                id="rentValue"
              />
              <label htmlFor="rentValue">Valor do Aluguel</label>
            </div>
          </div>
        )}

        {/* PROPERTY VALUE */}

        <div className="flex gap-4 mt-2">
          <InputNumber
            label="Mínimo"
            onChange={(e) => {
              const onlyNumbers = Number(e.target.value.replace(/\D/g, ""));

              setFormData({ ...formData, minValue: onlyNumbers });
            }}
            span="R$"
            value={formData.minValue}
          />

          <InputNumber
            label="Máximo"
            onChange={(e) => {
              const onlyNumbers = Number(e.target.value.replace(/\D/g, ""));

              setFormData({ ...formData, maxValue: onlyNumbers });
            }}
            span="R$"
            value={formData.maxValue}
          />
        </div>
      </div>

      {/* PROPERTY TYPES */}

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Tipo de imóvel</h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {propertyTypeOptions.map((option) => {
            const isChecked = formData.propertyType.includes(option);

            return (
              <div key={option} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={`type-${option}`}
                  checked={isChecked}
                  onChange={() => {
                    if (isChecked) {
                      // Se já tá marcado, FILTRA o array tirando essa opção
                      setFormData({
                        ...formData,
                        propertyType: formData.propertyType.filter(
                          (type) => type !== option,
                        ),
                      });
                    } else {
                      // Se não tá marcado, ADICIONA no array mantendo os que já estavam lá
                      setFormData({
                        ...formData,
                        propertyType: [...formData.propertyType, option],
                      });
                    }
                  }}
                />
                <label htmlFor={`type-${option}`}>
                  {propertyTypeMap[option] || option}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROOMS */}

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Quartos</h3>
        <div className="flex gap-2">
          {roomOptions.map((option) => {
            const isSelected = formData.minRooms === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, minRooms: option })}
                className={`px-3 py-1 rounded-full border transition-colors
                  ${
                    isSelected
                      ? "bg-brand-primary text-base-white border-brand-primary"
                      : "bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary"
                  }
                `}
              >
                {`${option}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* VAGAS DE GARAGEM */}

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">
          Vagas de garagem
        </h3>
        <div className="flex gap-2">
          {garageOptions.map((option) => {
            const isSelected = formData.garageSlots === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, garageSlots: option })
                }
                className={`px-3 py-1 rounded-full border transition-colors
                  ${
                    isSelected
                      ? "bg-brand-primary text-base-white border-brand-primary"
                      : "bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary"
                  }
                `}
              >
                {option === 0 ? "Tanto faz" : `${option}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* MÍNIMO DE BANHEIROS */}

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Banheiros</h3>
        <div className="flex gap-2">
          {bathroomsOptions.map((option) => {
            const isSelected = formData.minBathrooms === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, minBathrooms: option })
                }
                className={`px-3 py-1 rounded-full border transition-colors
                  ${
                    isSelected
                      ? "bg-brand-primary text-base-white border-brand-primary"
                      : "bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary"
                  }
                `}
              >
                {`${option}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* INPUTS DE ÁREA */}
      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Área</h3>
        <div className="flex gap-4 mt-2">
          <InputNumber
            label="Mínimo"
            onChange={(e) => {
              const onlyNumbers = Number(e.target.value.replace(/\D/g, ""));

              setFormData({ ...formData, minArea: onlyNumbers });
            }}
            span="m²"
            value={formData.minArea}
            className="flex-row-reverse"
          />

          <InputNumber
            label="Máximo"
            onChange={(e) => {
              const onlyNumbers = Number(e.target.value.replace(/\D/g, ""));

              setFormData({ ...formData, maxArea: onlyNumbers });
            }}
            span="m²"
            value={formData.maxArea}
            className="flex-row-reverse"
          />
        </div>
      </div>

      <div className="flex justify-between mt-4 border-t border-gray-200 p-4">
        <Button
          type="button"
          onClick={handleClear}
          variant="secondary"
          className="text-brand-primary w-fit py-1 px-2"
        >
          Limpar
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="primary"
          className="w-fit py-1 px-2"
        >
          Filtrar Imóveis
        </Button>
      </div>
    </form>
  );
};
