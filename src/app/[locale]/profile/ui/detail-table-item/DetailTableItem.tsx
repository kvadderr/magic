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
  transaction: 'Пополнение',
  purchase: 'Покупка',
  transfer: 'Перевод',
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
        <span
          className={`${data.method === 'Refill' ? 'green' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center' }} // Inline-flex и выравнивание
        >
          {data.amount == 1 ? 0 : data.amount}
          <Image
            src={StarIcon}
            alt=""
            width={24}
            height={24}
            style={{ width: '24px', height: '24px', marginLeft: '8px' }} // Отступ слева, чтобы картинка не прилипала к числу
          />
        </span>
      </td>
      <td>
        {data.method == 'Transfer'
          ? 'Перевод'
          : methodMapping[data.type as string] || data.method}
      </td>
      <td>
        <div className="tableStatus">
          <span
            className={
              (data.status as unknown as string) === 'SUCCESS' ? 'green' : ''
            }
          >
            {statusMapping[data.status as unknown as string] || 'Успешно'}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default DetailsTableItem;
