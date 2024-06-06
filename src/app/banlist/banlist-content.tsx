"use client"
import {useEffect, useState} from "react";
import {IBanListItem} from "@/api/banlist/types";
import BanListTable from "@/app/banlist/ui/banlist-table/BanListTable";
import {BanListApi} from "@/api/banlist/banlist.api";
import {SearchIcon} from "@/shared/assets";


const BanListContent = () => {
    const [data, set] = useState<IBanListItem[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filtered, setFiltered] = useState<IBanListItem[]>([]);

    const asyncData = async () => {
      const {data} = await BanListApi.getBanList(1);
      set(data.banlist);
    }

    useEffect(() => {
        asyncData()
    }, []);

    useEffect(() => {
        setFiltered(data.filter(el => el.nickname.includes(search)))
    }, [data, search]);

    return (
        <>
          <div className="searchInputWrap">
            <SearchIcon />
            <input
              onChange={ev => setSearch(ev.currentTarget.value)}
              type="text"
              className="searchInput"
              placeholder="Enter nickname or steam id"/>
          </div>
          <BanListTable items={filtered}/>
        </>
    )
}

export default BanListContent;
