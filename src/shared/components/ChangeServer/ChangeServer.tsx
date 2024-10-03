import { Dispatch, SetStateAction } from 'react';
import { IServersListResponse } from '@/api/serversList/types';
import {
  serviceModalChangeServerInInventory,
  serviceModalChangeServerTitle,
} from '@/shared/constants/modal';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';

interface ChangeServerProps {
  setSelectedServer: Dispatch<SetStateAction<number>>;
  infoOfSelect: IServersListResponse;
}

const ChangeServer = ({
  setSelectedServer,
  infoOfSelect,
}: ChangeServerProps) => {
  const handleChange = (event: any) => {
    setSelectedServer(event.value);
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
        value: '0',
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
      />
    </div>
  );
};
export default ChangeServer;
