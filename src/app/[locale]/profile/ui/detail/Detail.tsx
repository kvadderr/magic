"use client";
import {Ref, useEffect, useRef, useState} from "react";
import Pagination from "@/shared/components/Pagination/Pagination";
import {UserApi} from "@/api/user/user.api";
import {getDetailsMock, IGetDetailsData} from "@/api/user/types";
import DetailsTableItem from "@/app/[locale]/profile/ui/detail-table-item/DetailTableItem";
import {useTranslations} from "next-intl";

export const Detail = () => {
  const t = useTranslations("Profile");
  const [data, set] = useState<IGetDetailsData>();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<any | null | Ref<HTMLDivElement>>();

  const asyncData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    const {data} = await UserApi.getDetails(token, currentPage, 10, "desc");
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
            <th scope="col">{t("Table.Detail.date")}</th>
            <th scope="col">{t("Table.Detail.id")}</th>
            <th scope="col">{t("Table.Detail.sum")}</th>
            <th scope="col">{t("Table.Detail.type")}</th>
            <th scope="col">{t("Table.Detail.status")}</th>
          </tr>
          </thead>
          <tbody>
          <></>
          {
            data?.result[0] &&
            data?.result.map((el, index) => {
              return <DetailsTableItem data={el} key={index}/>;
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