"use client"
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import {serversListMock} from "@/api/serversList/mock";
import {ServersListApi} from "@/api/serversList/serversList.api";
import {IServersListItem} from "@/api/serversList/types";

interface ILeaderboardProvider {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    serverId: number,
    setServerId: Dispatch<SetStateAction<number>>,
    serversList: IServersListItem[],
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>
}

const Context = createContext<ILeaderboardProvider>({} as ILeaderboardProvider);
export const useLeaderboardProvider = () => useContext<ILeaderboardProvider>(Context);

export const LeaderboardProvider: FC<PropsWithChildren> = ({children}) => {
    const [modal, setModal] = useState<boolean>(false);
    const [serversList, set] = useState<IServersListItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [serverId, setServerId] = useState<number>(1);

    const asyncData = async () => {
        try {
            const {data} = await ServersListApi.getServersList();
            set(data);
        } catch (error) {
            set(serversListMock)
        }
    }

    useEffect(() => {
        asyncData()
    }, []);

    return <Context.Provider value={{
        serverId,
        setServerId,
        page,
        setPage,
        serversList,
        modal,
        setModal
    }}>{children}</Context.Provider>
}