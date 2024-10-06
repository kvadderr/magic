import React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { IServersListResponse } from "@/api/serversList/types";
import {
  serviceModalChangeServerInInventory,
  serviceModalChangeServerTitle,
} from "@/shared/constants/modal";
import CustomSelect from "@/shared/components/CustomSelect/CustomSelect";

interface ChangeServerProps {
  setSelectedServer: Dispatch<SetStateAction<number>>;
  infoOfSelect: IServersListResponse;
}

const ChangeServer = ({
  setSelectedServer,
  infoOfSelect,
}: ChangeServerProps) => {
  // Состояние для хранения выбранного сервера, по умолчанию '0'
  const [selectedOption, setSelectedOption] = useState({
    label: serviceModalChangeServerInInventory.ru,
    value: "0",
  });

  const handleChange = (event: any) => {
    setSelectedServer(event.value);
    setSelectedOption(event); // Обновляем выбранное значение
  };

  const selectOptions = () => {
    const servers = infoOfSelect
      ? infoOfSelect.map((item: any) => {
          return {
            label: item.name,
            value: String(item.id),
          };
        })
      : [];
    return [
      {
        label: serviceModalChangeServerInInventory.ru,
        value: "0",
      },
      ...servers,
    ];
  };

  return (
    <div className="serverForActivation">
      <span className="serverForActivationTitle">
        {serviceModalChangeServerTitle.ru}
      </span>
      <CustomSelect
        options={selectOptions()}
        onChange={handleChange}
        menuPlacement="top"
        value={selectedOption} // Устанавливаем значение по умолчанию
      />
    </div>
  );
};

export default ChangeServer;
