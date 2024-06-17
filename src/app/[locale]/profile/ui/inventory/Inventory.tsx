"use client";
import {Ref, useEffect, useRef, useState} from "react";
import Pagination from "@/shared/components/Pagination/Pagination";
import {UserApi} from "@/api/user/user.api";
import {getInventoryDataItem, getInventoryDataItemMock, IGetInventoryResponse} from "@/api/user/types";
import InventoryTableItem from "@/app/[locale]/profile/ui/inventory-table-item/InventoryTableItem";
import {useTranslations} from "next-intl";

export const Inventory = () => {
  const t = useTranslations("Profile");
  const [data, set] = useState<IGetInventoryResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<any | null | Ref<HTMLDivElement>>();

  const asyncData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    const {data} = await UserApi.getInventory(token, currentPage, 10);
    set(data);
  }

  useEffect(() => {
    asyncData()
  }, [currentPage]);
  useEffect(() => {
    tableRef?.current?.scrollTo({left: 0, behavior: 'smooth'});
  }, [currentPage]);

  return !data?.result[0] ? <h1 className="noRecords">{t("Table.empty")}</h1> : (
    <div className="container">
      <div className="sortBlock">
        {/* <SearchInput placeholder="Введите название предмета" value={value} setValue={setValue} /> */}
        {/* <button className="btn blackBtn filterBtn">
          <SettingsIcon /> <span>Фильтр</span>
        </button> */}
      </div>
      <div ref={tableRef} className="tableWrap">
        <table className="tableForInventory">
          <thead>
          <tr>
            <th scope="col">{t("Table.Inventory.id")}</th>
            <th scope="col">{t("Table.Inventory.title")}</th>
            <th scope="col">{t("Table.Inventory.amount")}</th>
            <th scope="col">{t("Table.Inventory.mode")}</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <></>
          {
            data?.result[0] &&
            data?.result.map((el, index) => {
              return <InventoryTableItem data={{dataInventory: el}} key={index} />;
            })
          }
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesAmount={data.pages}
        perPage={10}
      />
    </div>
  )
}