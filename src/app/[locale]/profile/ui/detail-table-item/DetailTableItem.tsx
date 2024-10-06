import React, { useMemo } from "react";
import { getDate } from "@/shared/constants/getDate";
import { getDetailsDataItem } from "@/api/user/types";
//import { useTranslations } from 'next-intl';
//import { StarIcon } from "@/shared/assets/img";
//import Image from "next/image";
import "./detail-table-item.scss";

export interface DetailsTableItemProps {
  data: getDetailsDataItem; // Убедитесь, что тип включает все необходимые поля
}

// Маппинг статусов
const statusMapping: Record<string, string> = {
  SUCCESS: "Успешно",
  FALSE: "Неудача",
  DENIED: "Отклонено",
  REFUND: "Возврат",
  IN_PROGRESS: "В ожидании",
};

// Маппинг статусов
const classesMapping: Record<string, string> = {
  SUCCESS: "detail-table-item__success",
  FALSE: "detail-table-item__false",
  DENIED: "detail-table-item__denied",
  REFUND: "detail-table-item__refund",
  IN_PROGRESS: "detail-table-item__waiting",
};

// Маппинг методов
const methodMapping: Record<string, string> = {
  Refill: "Депозит",
  transaction: "Пополнение",
  purchase: "Покупка",
  transfer: "Перевод",
  Withdrawal: "Снятие",
  Deposit: "Депозит",
};

const DetailsTableItem: React.FC<DetailsTableItemProps> = ({ data }) => {
  //const t = useTranslations('Profile.Table.Detail');

  const status = useMemo(() => {
    return statusMapping[data.status as unknown as string];
  }, [data]);
  const classes = useMemo(() => {
    return classesMapping[data.status as unknown as string];
  }, [data]);
  return (
    <tr>
      <td style={{ fontWeight: 600 }} className="tablePurple">
        {getDate(data.createdAt)}
      </td>
      <td style={{ fontWeight: 600 }} className="tablePurple">
        # {data.id}
      </td>
      <td
        style={{ fontWeight: 600 }}
        className={`${status === "Успешно" && "detail-table-item__success"}`}>
        <span style={{ fontWeight: 600 }}>
          {!data.product
            ? data.amount
            : data.product.isGift
              ? 0
              : data.product.price}{" "}
          ₽
        </span>
      </td>
      <td style={{ fontWeight: 600 }}>
        {data.method == "Transfer"
          ? "Перевод"
          : methodMapping[data.type as string] || data.method}
      </td>
      <td>
        <div className={`detail-table-item__status ${classes}`}>
          <span
            className={status === "Успешно" ? "detail-table-item__green" : ""}>
            {status || "Успешно"}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default DetailsTableItem;
