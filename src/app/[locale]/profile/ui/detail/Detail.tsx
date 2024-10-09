"use client";
import React, { useRef, useState, useEffect } from "react";
import TransferModal from "./TransferModal";
import { Ref } from "react";
import Pagination from "@/shared/components/Pagination/Pagination";
import DetailsTableItem from "@/app/[locale]/profile/ui/detail-table-item/DetailTableItem";
import {useLocale, useTranslations} from "next-intl";
import Image from "next/image";
import { SearchIcon } from "@/shared/assets";
import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";
import {useRouter} from "next/navigation";

export const Detail = (props: {
  userDetails: any; // Данные передаются через пропсы
  balance: number;
  steamId: string;
  token: string;
  page: number;
}) => {
  const {
    userDetails,
    balance,
    steamId,
    page,
    token,
  } = props;
  const t = useTranslations("Profile");
  const router = useRouter();
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<any | null | Ref<HTMLDivElement>>();

  return (
    <div className="container">
      {/* Отображение баланса и кнопка для перевода */}
      <div className="populateBalanceInDetail">
        <div>
          <p className="balanceHeader">{t("Table.Detail.heading")}</p>
          <p className="balanceValue">{balance} &#8381;</p>
        </div>
        <div style={{ gap: 12, flexDirection: "row", display: "flex" }}>
          <button
            onClick={() => router.push(`/${locale}/deposit`)} // Открываем модалку
            className="btn wideBtn lightBtn"
            style={{ gap: 12, paddingLeft: 48, paddingRight: 48 }}>
            <Image
              src="/svg/plusBalance.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <span style={{ fontSize: 16 }}>{t("Table.Detail.replenish")}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // Открываем модалку
            className="btn wideBtn blackBtn"
            style={{ gap: 12, paddingLeft: 48, paddingRight: 48 }}>
            <span style={{ fontSize: 16 }}>{t("Table.Detail.transfer")}</span>
          </button>
        </div>

        {isModalOpen && ( // Условно рендерим модалку
          <ModalPortal>
            <TransferModal
              onClose={() => setIsModalOpen(false)}
              balance={balance}
              token={token}
              steamID={steamId}
            />
          </ModalPortal>
        )}
      </div>
      <div className="searchInputWrap" style={{ marginTop: "32px" }}>
        <SearchIcon />
        <input
          value=""
          placeholder={t("Table.Detail.input_placeholder")}
          onChange={(e) => {}}
          type="text"
          className="searchInput"
        />
      </div>

      {/* Таблица с деталями операций */}
      {!userDetails?.result[0] ? (
        <h1 className="noRecords">{t("Table.Detail.enough")}</h1>
      ) : (
        <>
          <div ref={tableRef} className="tableWrap">
            <table className="tableForInventory">
              <thead>
                <tr>
                  <th scope="col">{t("Table.Detail.date")}</th>
                  <th scope="col">{t("Table.Detail.id")}</th>
                  <th scope="col">{t("Table.Detail.sum")}</th>
                  <th scope="col">{t("Table.Detail.type")}</th>
                  <th scope="col">{t("Table.Detail.status")}</th>
                </tr>
              </thead>
              <tbody>
                {userDetails?.result[0] &&
                  userDetails?.result.map((el: any, index: number) => {
                    return <DetailsTableItem data={el} key={index} />;
                  })}
              </tbody>
            </table>
          </div>

          {/* Пагинация */}
          <Pagination
            currentPage={page}
            setCurrentPage={(v) => {
              router.push(`/${locale}/profile?tab=detail&page=${v}`)
            }}
            pagesAmount={userDetails.pages}
            perPage={10}
          />
        </>
      )}
    </div>
  );
};
