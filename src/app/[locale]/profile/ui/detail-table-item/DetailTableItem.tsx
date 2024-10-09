import React, {useMemo} from "react";
import {getDate} from "@/shared/constants/getDate";
import {getDetailsDataItem} from "@/api/user/types";
//import { useTranslations } from 'next-intl';
//import { StarIcon } from "@/shared/assets/img";
//import Image from "next/image";
import "./detail-table-item.scss";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {StarIcon} from "@/shared/assets/img";

export interface DetailsTableItemProps {
    data: getDetailsDataItem; // Убедитесь, что тип включает все необходимые поля
}


// Маппинг статусов
const classesMapping: Record<string, string> = {
    SUCCESS: "detail-table-item__success",
    FALSE: "detail-table-item__false",
    DENIED: "detail-table-item__denied",
    REFUND: "detail-table-item__refund",
    IN_PROGRESS: "detail-table-item__waiting",
};

const DetailsTableItem: React.FC<DetailsTableItemProps> = ({data}) => {
    const t = useTranslations('Profile.Table.Detail');

    const methodMapping: Record<string, string> = {
        Refill: t("Type.refill"),
        transaction: t("Type.transaction"),
        purchase: t("Type.purchase"),
        transfer: t("Type.transfer"),
        Withdrawal: t("Type.withdrawal"),
        Deposit: t("Type.deposit"),
    };

    const status = useMemo(() => {
        return t("Status." + data.status);
    }, [data]);
    const classes = useMemo(() => {
        return classesMapping[data.status as unknown as string];
    }, [data]);
    return (
        <tr>
            <td style={{fontWeight: 600}} className="tablePurple">
                {getDate(data.createdAt)}
            </td>
            <td style={{fontWeight: 600}} className="tablePurple">
                # {data.id}
            </td>
            <td
                style={{fontWeight: 600}}
                className={`${data.status && "detail-table-item__success"}`}>
        <span style={{fontWeight: 600, display: "flex", alignItems: "center", lineHeight: "16px", gap: "5px"}}>
                      <Image
                          src={StarIcon}
                          alt=""
                          width={8}
                          height={8}
                          style={{display: 'flex', width: '8px', height: '8px', marginRight: "5px"}}
                      />
            {!data.product
              ? data.amount
              : data.product.isGift
                  ? 0
                  : data.product.price
          }

        </span>
            </td>
            <td style={{fontWeight: 600}}>
                {data.method == "Transfer"
                    ? t("Type.transfer")
                    : methodMapping[data.type as string] || data.method}
            </td>
            <td>
                <div className={`detail-table-item__status ${classes}`}>
          <span
              className={(status === "Успешно" || status === "SUCCESS") ? "detail-table-item__green" : ""}>
            {data.status === undefined ? t("Status.undefined") : t("Status.SUCCESS")}
          </span>
                </div>
            </td>
        </tr>
    );
};

export default DetailsTableItem;
