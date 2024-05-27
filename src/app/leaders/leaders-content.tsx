"use client"
import {useEffect, useState} from "react";
import {IBanListItem} from "@/api/banlist/types";
import BanListTable from "@/app/banlist/ui/banlist-table/BanListTable";
import {LeaderboardApi} from "@/api/leaderboard/leaderboard.api";
import {ILeaderboardItem} from "@/api/leaderboard/types";
import LeaderboardTable from "@/app/leaders/ui/leaderboard-table/LeaderboardTable";
import {leaderBoardMock} from "@/api/leaderboard/mock";
import {ServersModal} from "@/app/leaders/ui/servers-modal/ServersModal";
import {useLeaderboardProvider} from "@/app/leaders/api";

const LeaderboardContent = () => {
    const {modal, setModal, page, serverId} = useLeaderboardProvider();
    const [data, set] = useState<ILeaderboardItem[]>([]);
    const [search, setSearch] = useState<string>("");

    const asyncData = async () => {
        try {
            const {data} = await LeaderboardApi.getLeaderboard(page, serverId);
            set(data.leaderboard);
        } catch (error) {
            set(leaderBoardMock);
        }
    }

    useEffect(() => {
        asyncData()
    }, [page, serverId]);

    return (
        <>
            <button onClick={() => setModal(true)} className="btn blackBtn" style={{width:"200px", height:"50px", margin:"20px auto"}}>Select a server</button>
            <LeaderboardTable items={data}/>
            {modal && <ServersModal />}
        </>
    )
}

export default LeaderboardContent;