"use client"
import {useEffect, useState} from "react";
import {LeaderboardApi} from "@/api/leaderboard/leaderboard.api";
import {IGetLeaderBoard, ILeaderboardItem} from "@/api/leaderboard/types";
import LeaderboardTable from "@/app/[locale]/leaders/ui/leaderboard-table/LeaderboardTable";
import {leaderBoardMock} from "@/api/leaderboard/mock";
import {ServersModal} from "@/app/[locale]/leaders/ui/servers-modal/ServersModal";
import {useLeaderboardProvider} from "@/app/[locale]/leaders/api";
import Pagination from "@/shared/components/Pagination/Pagination";
import {useTranslations} from "next-intl";
import Pedestal from "@/shared/components/Pedestal/Pedestal";
import chunkArray from "@/shared/hooks/chunkArray";

const LeaderboardContent = (props: { page: string }) => {
  const t = useTranslations("Leaderboard");
  const [isLoading, setIsLoading] = useState(false);
  const {modal, setModal, serverId} = useLeaderboardProvider();
  const [data, set] = useState<ILeaderboardItem[][]>();
  const [top, setTop] = useState<ILeaderboardItem[]>();
  const [page, setPage] = useState(
    props.page && parseInt(props.page) ? parseInt(props.page) : 1
  );

  const asyncData = async () => {
    try {
      setIsLoading(true);
      const [list, top] = await Promise.all([
        LeaderboardApi.getLeaderboard(serverId),
        LeaderboardApi.getLeaderboardTop(serverId)
      ]);
      set(chunkArray(list.data.leaderboard, 10));
      setTop(top.data as unknown as ILeaderboardItem[]);

      setIsLoading(false);
    } catch (error) {
    }
  }

  useEffect(() => {
    asyncData()
  }, [page, serverId]);

  return isLoading ? <h2 style={{textAlign: "center"}}>{t("loading")}</h2> : (
    <>
      {top && (
        <div className="containerPedestal">
          <Pedestal data={top}/>
        </div>
      )}
      <button
        onClick={() => setModal(true)}
        className="btn blackBtn topRight"
        style={{width: "200px", height: "50px", margin: "20px auto"}}
      >
        {t("button")}
      </button>
      {!(!data || data.length === 0) &&
        <>
          <LeaderboardTable items={data[page - 1]}/>
          <Pagination
            currentPage={page}
            pagesAmount={data.length}
            setCurrentPage={setPage}
            perPage={5}
          />
        </>
      }
      {modal && <ServersModal/>}
    </>
  )
}

export default LeaderboardContent;
