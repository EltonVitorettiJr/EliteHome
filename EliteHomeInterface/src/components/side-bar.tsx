import { useState } from "react";

const ACTIVE_TAB_TYPES = {
  ALUGAR: "ALUGAR",
  COMPRAR: "COMPRAR",
};

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(ACTIVE_TAB_TYPES.ALUGAR);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <nav>
      <fieldset>
        <button type="button">Alugar</button>
        <button type="button">Comprar</button>
      </fieldset>

      {activeTab === ACTIVE_TAB_TYPES.ALUGAR && (
        <div>
          <fieldset>
            <input type="checkbox" />
            <input type="checkbox" />
          </fieldset>
          <input
            type="text"
            inputMode="numeric"
            onChange={(e) => e.target.value.replace(/\D/g, "")}
          />
          <input
            type="text"
            inputMode="numeric"
            onChange={(e) => e.target.value.replace(/\D/g, "")}
          />
        </div>
      )}

      <div>
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div>
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div>
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div>
        <input
          type="text"
          inputMode="numeric"
          onChange={(e) => e.target.value.replace(/\D/g, "")}
        />
        <input
          type="text"
          inputMode="numeric"
          onChange={(e) => e.target.value.replace(/\D/g, "")}
        />
      </div>
    </nav>
  );
};
