"use client"
import {useEffect, useState} from "react";
import {IBanListItem, IGetBanList} from "@/api/banlist/types";
import BanListTable from "@/app/[locale]/banlist/ui/banlist-table/BanListTable";
import {BanListApi} from "@/api/banlist/banlist.api";
import {SearchIcon} from "@/shared/assets";
import Pagination from "@/shared/components/Pagination/Pagination";


const BanListContent = (props: { page: string }) => {
  const [data, set] = useState<IGetBanList>();
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<IBanListItem[]>([]);
  const [page, setPage] = useState(
    props && props.page && parseInt(props.page) ? parseInt(props.page) : 1
  );

  const asyncData = async () => {
    const {data} = await BanListApi.getBanList(page);
    set(data);
  }

  useEffect(() => {
    asyncData().then(_ => setSearch(""))
  }, [page]);

  useEffect(() => {
    if (!data?.banlist) {
      return;
    }
    setFiltered(data?.banlist.filter(el => el.nickname.includes(search)))
  }, [data, search]);

  return (
    <>
      <div className="searchInputWrap">
        <SearchIcon/>
        <input
          value={search}
          onChange={ev => setSearch(ev.currentTarget.value)}
          type="text"
          className="searchInput"
          placeholder="Enter nickname or steam id"/>
      </div>
      {!(!data || data.banlist.length === 0) &&
        <>
          <BanListTable items={filtered}/>
          <Pagination
            currentPage={page}
            pagesAmount={data.pages}
            setCurrentPage={setPage}
            perPage={5}
          />
        </>
      }
    </>
  )
}

export default BanListContent;
