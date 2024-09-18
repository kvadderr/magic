"use client";
import {Ref, useEffect, useRef, useState} from "react";
import Pagination from "@/shared/components/Pagination/Pagination";
import {UserApi} from "@/api/user/user.api";
import {IGetDetailsData} from "@/api/user/types";
import DetailsTableItem from "@/app/[locale]/profile/ui/detail-table-item/DetailTableItem";
import {useLocale, useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const Detail = () => {
  const t = useTranslations("Profile");
  const [data, set] = useState<IGetDetailsData>();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<any | null | Ref<HTMLDivElement>>();
  const locale = useLocale();
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
  
  return (
    <div className="container">
      <div className="populateBalanceInDetail">
        <div>
          <p className="balanceHeader">Баланс</p>
          <p className="balanceValue">32465 ₽</p>
        </div>
        <div style={{gap: 12, flexDirection: 'row', display: 'flex'}}>
          <Link href={`/${locale}/deposit`} className="btn wideBtn lightBtn " style={{gap: 12, paddingLeft: 48, paddingRight: 48}}>
            <Image src='/svg/plusBalance.svg' alt='logo' width={24} height={24}/>
            <span style={{fontSize: 16}}>Пополнить</span>
          </Link>
        </div>
      </div>
      {
        !data?.result[0] ? <h1 className="noRecords">Нет записей</h1> :
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
          </>
      }
    
    </div>
  )
}
