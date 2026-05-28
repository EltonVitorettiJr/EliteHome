import { type HTMLAttributes, useState } from "react";
import { propertyType } from "../types/property";
import { Button } from "./button";
import { InputNumber } from "./input-number";

interface SideBarProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const SideBar = ({ className, ...props }: SideBarProps) => {
  const roomOptions = [1, 2, 3, 4];
  const garageOptions = [0, 1, 2, 3, 4];
  const bathroomsOptions = [1, 2, 3, 4];

  const ACTIVE_TAB_TYPES = {
    ALUGAR: "ALUGAR",
    COMPRAR: "COMPRAR",
  };

  const defaultFormValues = {
    isRent: true,
    totalValue: true,
    rentValue: false,
    minValue: 500,
    maxValue: 20000,
    propertyType: propertyType.APARTMENT,
    numberOfRooms: 3,
    garageSlots: 2,
    numberOfBathrooms: 2,
    minArea: 20,
    maxArea: 1000,
  };

  const [activeTab, setActiveTab] = useState<string>(ACTIVE_TAB_TYPES.ALUGAR);
  const [formData, setFormData] = useState(defaultFormValues);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === ACTIVE_TAB_TYPES.COMPRAR) {
      setFormData({
        ...defaultFormValues,
        isRent: false,
        totalValue: false,
        rentValue: false,
      });
    } else {
      setFormData({ ...defaultFormValues, isRent: true, totalValue: true });
    }
  };

  const handleClear = () => {
    setFormData(defaultFormValues);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <form className={`${className}`} {...props}>
      <fieldset className="flex gap-4 px-4">
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

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Quartos</h3>
        <div className="flex gap-2">
          {roomOptions.map((option) => {
            const isSelected = formData.numberOfRooms === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, numberOfRooms: option })
                }
                className={`px-3 py-1 rounded-full border transition-colors
                  ${
                    isSelected
                      ? "bg-brand-primary text-base-white border-brand-primary"
                      : "bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary"
                  }
                `}
              >
                {option === 4 ? "4+" : option}
              </button>
            );
          })}
        </div>
      </div>

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
                {option === 0 ? "Tanto faz" : option === 4 ? "4+" : option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4">
        <h3 className="font-bold text-base-black-blue mb-2">Banheiros</h3>
        <div className="flex gap-2">
          {bathroomsOptions.map((option) => {
            const isSelected = formData.numberOfBathrooms === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, numberOfBathrooms: option })
                }
                className={`px-3 py-1 rounded-full border transition-colors
                  ${
                    isSelected
                      ? "bg-brand-primary text-base-white border-brand-primary"
                      : "bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary"
                  }
                `}
              >
                {option === 4 ? "4+" : option}
              </button>
            );
          })}
        </div>
      </div>

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
          onClick={() => handleClear}
          variant="secondary"
          className="text-brand-primary w-fit py-1 px-2"
        >
          Limpar
        </Button>
        <Button
          type="submit"
          onClick={() => handleSubmit}
          variant="primary"
          className="w-fit py-1 px-2"
        >
          Filtrar Imóveis
        </Button>
      </div>
    </form>
  );
};
