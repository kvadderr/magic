import React from 'react';
import { getDate } from '@/shared/constants/getDate';
import { getDetailsDataItem } from '@/api/user/types';
//import { useTranslations } from 'next-intl';
import { StarIcon } from '@/shared/assets/img';
import Image from 'next/image';

export interface DetailsTableItemProps {
  data: getDetailsDataItem; // Убедитесь, что тип включает все необходимые поля
}

// Маппинг статусов
const statusMapping: Record<string, string> = {
  SUCCESS: 'Успешно',
  FALSE: 'Неудача',
  DENIED: 'Отклонено',
  REFUND: 'Возврат',
  IN_PROGRESS: 'В ожидании',
};

// Маппинг методов
const methodMapping: Record<string, string> = {
  Refill: 'Депозит',
  Purchase: 'Покупка',
  Transfer: 'Перевод',
  Withdrawal: 'Снятие',
  Deposit: 'Депозит',
};

const DetailsTableItem: React.FC<DetailsTableItemProps> = ({ data }) => {
  //const t = useTranslations('Profile.Table.Detail');

  return (
    <tr>
      <td className="tablePurple">{getDate(data.createdAt)}</td>
      <td className="tablePurple"># {data.id}</td>
      <td>
        <span className={`${data.method === 'Refill' ? 'green' : ''}`}>
          {data.amount}
          <Image
            src={StarIcon}
            alt=""
            width={24}
            height={24}
            style={{ display: 'flex', width: '24px', height: '24px' }}
          />
        </span>
      </td>
      <td>{methodMapping[data.method as string] || data.method}</td>
      <td>
        <div className="tableStatus">
          <span
            className={
              (data.status as unknown as string) === 'SUCCESS' ? 'green' : ''
            }
          >
            {statusMapping[data.status as unknown as string] || data.status}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default DetailsTableItem;
