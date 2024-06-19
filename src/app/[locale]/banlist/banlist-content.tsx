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
  const [fetched, set] = useState<IBanListItem[][]>([]);
  const [searched, setSearched] = useState<IBanListItem[][]>([]);
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<IBanListItem[]>([]);
  const [page, setPage] = useState(
    props && props.page && parseInt(props.page) ? parseInt(props.page) : 1
  );
  const [pages, setPages] = useState<number>();

  const asyncData = async () => {
    const {data} = await BanListApi.getBanList();
    const items = chunkArray(data.banlist, 10);
    set(items);
    setSearched(items)
    setPages(items.length)
  }

  useEffect(() => {
    asyncData();
  }, []);

  useEffect(() => {
    if (!fetched.length) return;
    if (search === "") {
      setSearched(fetched);
      setPages(fetched.length);
      setPage(1);
      return;
    }
    const filteredPages: IBanListItem[] = [];
    fetched.forEach(
      page => page.forEach(
        el => {
          if (el.nickname.includes(search)) filteredPages.push(el);
        }
      )
    );
    const items = chunkArray(filteredPages, 10);
    setSearched(items);
    setPages(items.length);
    setPage(1);
  }, [search]);

  useEffect(() => {
    setFiltered(searched[page - 1]);
  }, [page]);

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
      {!(!fetched || !pages || fetched.length === 0) &&
        <>
          <BanListTable items={filtered}/>
          {
            search === "" ??
            <Pagination
              currentPage={page}
              pagesAmount={pages}
              setCurrentPage={setPage}
              perPage={10}
            />
          }
        </>
      }
    </>
  )
}

export default BanListContent;
