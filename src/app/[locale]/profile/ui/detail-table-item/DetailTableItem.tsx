import React from 'react';
import {getNameOperation} from "@/shared/constants/getNameOperation";
import {getDate} from "@/shared/constants/getDate";
import {getDetailsDataItem} from "@/api/user/types";
import {useTranslations} from "next-intl";

export interface DetailsTableItemProps {
  data: getDetailsDataItem;
}

const DetailsTableItem: React.FC<DetailsTableItemProps> = ({data}) => {
  const t = useTranslations("Profile.Table.Detail");

  return (
    <tr>
      <td className="tablePurple">{getDate(data.createdAt)}</td>
      <td className="tablePurple"># {data.id}</td>
      <td>
        <span className={`${data.type == 'purchase' && data.refund === false ? '' : 'green'}`}>
          {data.lostMainBalance ? data.lostMainBalance : data.type === 'transaction' ? data.amount : '0'} ₽
        </span>
      </td>
      {/*<td>{data?.product?.name_ru ? data?.name : 'йцу'}</td>*/}
      <td>{data.amount !== undefined && data.type !== 'transaction' ? data.amount : ''}</td>

      {/*<td scope="row">{getNameOperation(data.type, data.refund)}</td>*/}
      <td>
        <div className="tableStatus">
          <span className={`${data.refund ? 'green' : ''}`}>{data.refund ? t("status_write_off") : t("status_write")}</span>
        </div>
      </td>
    </tr>
  );
};

export default DetailsTableItem;
