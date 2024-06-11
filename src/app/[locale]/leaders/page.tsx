import LeaderboardContent from "@/app/[locale]/leaders/leaders-content";
import {LeaderboardProvider} from "@/app/[locale]/leaders/api";
import {getTranslations} from "next-intl/server";

export default async function LeadersPage(props: { searchParams: { page: string } }) {
  const t = await getTranslations("Leaderboard");

  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{t("title")}</h1>
      <LeaderboardProvider>
        <LeaderboardContent page={props.searchParams.page}/>
      </LeaderboardProvider>
    </div>
  )
}
