"use client"
import {useEffect, useState} from "react";
import {LeaderboardApi} from "@/api/leaderboard/leaderboard.api";
import {IGetLeaderBoard, ILeaderboardItem} from "@/api/leaderboard/types";
import LeaderboardTable from "@/app/[locale]/leaders/ui/leaderboard-table/LeaderboardTable";
import {leaderBoardMock} from "@/api/leaderboard/mock";
import { ServersModal} from "@/app/[locale]/leaders/ui/servers-modal/ServersModal";
import { useLeaderboardProvider} from "@/app/[locale]/leaders/api";
import Pagination from "@/shared/components/Pagination/Pagination";
import {useTranslations} from "next-intl";
import Pedestal from "@/shared/components/Pedestal/Pedestal";

const LeaderboardContent = (props: { page: string }) => {
  const t = useTranslations("Leaderboard");
  const {modal, setModal, serverId} = useLeaderboardProvider();
  const [data, set] = useState<IGetLeaderBoard>();
  const [top, setTop] = useState<IGetLeaderBoard>();
  const [page, setPage] = useState(
    props.page && parseInt(props.page) ? parseInt(props.page) : 1
  );

  const asyncData = async () => {
    try {
      const {data: list} = await LeaderboardApi.getLeaderboard(page, serverId);
      const {data: top} = await LeaderboardApi.getLeaderboardTop(serverId);
      set(list);
      setTop(top);
    } catch (error) {
      set({leaderboard: leaderBoardMock, pages: 10});
    }
  }

  useEffect(() => {
    asyncData()
  }, [page, serverId]);

  return (
    <>
      {top && (
        <div className="containerPedestal">
          <Pedestal data={top} />
        </div>
      )}
      <button onClick={() => setModal(true)} className="btn blackBtn"
              style={{width: "200px", height: "50px", margin: "20px auto"}}
      >
        {t("button")}
      </button>
      {!(!data || data.leaderboard.length === 0) &&
        <>
          <LeaderboardTable items={data.leaderboard}/>
          <Pagination
            currentPage={page}
            pagesAmount={data.pages}
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
