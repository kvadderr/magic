"use client"
import {useEffect, useState} from "react";
import {IBanListItem, IGetBanList} from "@/api/banlist/types";
import BanListTable from "@/app/[locale]/banlist/ui/banlist-table/BanListTable";
import {BanListApi} from "@/api/banlist/banlist.api";
import {SearchIcon} from "@/shared/assets";
import Pagination from "@/shared/components/Pagination/Pagination";
import {useTranslations} from "next-intl";
import chunkArray from "@/shared/hooks/chunkArray";


const BanListContent = (props: { page: string }) => {
  const t = useTranslations("Ban_List");
  const [data, set] = useState<IBanListItem[][]>([]);
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<IBanListItem[]>([]);
  const [page, setPage] = useState(
    props && props.page && parseInt(props.page) ? parseInt(props.page) : 1
  );

  const asyncData = async () => {
    const {data} = await BanListApi.getBanList();
    set(chunkArray(data.banlist, 10));
  }

  useEffect(() => {
    asyncData().then(_ => setSearch(""));
  }, []);

  useEffect(() => {
    if (!data.length) {
      return;
    }
    const items = data[page - 1].filter(el => el.nickname.includes(search));
    setFiltered(items)
  }, [data, page, search]);

  return (
    <>
      <div className="searchInputWrap">
        <SearchIcon/>
        <input
          value={search}
          onChange={ev => setSearch(ev.currentTarget.value)}
          type="text"
          className="searchInput"
          placeholder={t("input")}/>
      </div>
      {!(!data || data.length === 0) &&
        <>
          <BanListTable items={filtered}/>
          <Pagination
            currentPage={page}
            pagesAmount={data.length}
            setCurrentPage={setPage}
            perPage={10}
          />
        </>
      }
    </>
  )
}

export default BanListContent;
