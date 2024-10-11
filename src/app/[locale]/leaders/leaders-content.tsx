"use client";
import React from "react";
import { useEffect, useState } from "react";
import { LeaderboardApi } from "@/api/leaderboard/leaderboard.api";
import { ILeaderboardItem } from "@/api/leaderboard/types";
import LeaderboardTable from "@/app/[locale]/leaders/ui/leaderboard-table/LeaderboardTable";
import { ServersModal } from "@/app/[locale]/leaders/ui/servers-modal/ServersModal";
import { useLeaderboardProvider } from "@/app/[locale]/leaders/api";
import Pagination from "@/shared/components/Pagination/Pagination";
import { useTranslations } from "next-intl";
import Pedestal from "@/shared/components/Pedestal/Pedestal";
import chunkArray from "@/shared/hooks/chunkArray";

const CACHE_KEY_LEADERBOARD = "leaderboard_data";
const CACHE_KEY_TOP = "leaderboard_top";
const CACHE_TTL = 5 * 60 * 1000;

const LeaderboardContent = (props: { page: string }) => {
  const t = useTranslations("Leaderboard");
  const [isLoading, setIsLoading] = useState(false);
  const { modal, setModal, serverId } = useLeaderboardProvider();
  const [data, set] = useState<ILeaderboardItem[][]>();
  const [top, setTop] = useState<ILeaderboardItem[]>();
  const [page, setPage] = useState(
    props.page && parseInt(props.page) ? parseInt(props.page) : 1,
  );

  const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const asyncData = async () => {
    try {
      setIsLoading(true);

      const cachedLeaderboard = getWithExpiry(
        `${CACHE_KEY_LEADERBOARD}_${serverId}`,
      );
      const cachedTop = getWithExpiry(`${CACHE_KEY_TOP}_${serverId}`);

      if (cachedLeaderboard && cachedTop) {
        set(cachedLeaderboard);
        setTop(cachedTop);
      } else {
        const [list, top] = await Promise.all([
          LeaderboardApi.getLeaderboard(serverId),
          LeaderboardApi.getLeaderboardTop(serverId),
        ]);

        const leaderboardData = chunkArray(list.data.leaderboard, 10);
        set(leaderboardData);
        setTop(top.data as unknown as ILeaderboardItem[]);

        setWithExpiry(
          `${CACHE_KEY_LEADERBOARD}_${serverId}`,
          leaderboardData,
          CACHE_TTL,
        );
        setWithExpiry(`${CACHE_KEY_TOP}_${serverId}`, top.data, CACHE_TTL);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading leaderboard data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncData();
  }, [page, serverId]);

  return isLoading ? (
    <h2 style={{ textAlign: "center" }}>{t("loading")}</h2>
  ) : (
    <>
      {top && (
        <div className="containerPedestal">
          <Pedestal data={top} />
        </div>
      )}
      <button
        onClick={() => setModal(true)}
        className="btn blackBtn topRight"
        style={{ width: "200px", height: "50px", margin: "20px auto" }}>
        {t("button")}
      </button>
      {!(!data || data.length === 0) && (
        <>
          <LeaderboardTable items={data[page - 1]} />
          <Pagination
            currentPage={page}
            pagesAmount={data.length}
            setCurrentPage={setPage}
            perPage={5}
          />
        </>
      )}
      {modal && <ServersModal />}
    </>
  );
};

export default LeaderboardContent;
