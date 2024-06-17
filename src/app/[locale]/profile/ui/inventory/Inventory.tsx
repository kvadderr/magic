"use client";
import {Ref, useEffect, useRef, useState} from "react";
import Pagination from "@/shared/components/Pagination/Pagination";
import {UserApi} from "@/api/user/user.api";
import {getInventoryDataItem, getInventoryDataItemMock, IGetInventoryResponse} from "@/api/user/types";
import InventoryTableItem from "@/app/[locale]/profile/ui/inventory-table-item/InventoryTableItem";

export const Inventory = () => {
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

  return !data?.result[0] ? <h1 className="noRecords">Нет записей</h1> : (
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
            <th scope="col">ID</th>
            <th scope="col">Товар</th>
            <th scope="col">Количество</th>
            <th scope="col">Режим</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <></>
          {
            data?.result[0] &&
            data?.result.map((el, index) => {
              return <InventoryTableItem data={{dataInventory: el, refund: () => {}}} key={index} />;
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