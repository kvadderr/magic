"use client"
import {useEffect, useState} from "react";
import {IBanListItem} from "@/api/banlist/types";
import BanListTable from "@/app/banlist/ui/banlist-table/BanListTable";
import {BanListApi} from "@/api/banlist/banlist.api";
import {banListMock} from "@/api/banlist/mock";

const BanListContent = () => {
    const [data, set] = useState<IBanListItem[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filtered, setFiltered] = useState<IBanListItem[]>([]);

    const asyncData = async () => {
        try {
            const {data} = await BanListApi.getBanList(1);
            set(data.banlist);
        } catch (error) {
            set(banListMock);
        }
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
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="searchIcon">
                    <g opacity=".7" fillRule="evenodd" clipRule="evenodd" fill="#8774B8">
                        <path
                            d="M13.793 13.793a1 1 0 0 1 1.414 0l5.5 5.5a1 1 0 0 1-1.414 1.414l-5.5-5.5a1 1 0 0 1 0-1.414Z"
                        />
                        <path d="M10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-7 5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"/>
                    </g>
                </svg>
                <input onChange={ev => setSearch(ev.currentTarget.value)} type="text" className="searchInput" placeholder="Enter nickname or steam id"/>
            </div>
            <BanListTable items={filtered}/>
        </>
    )
}

export default BanListContent;