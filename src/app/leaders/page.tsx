import LeaderboardContent from "@/app/leaders/leaders-content";
import {LeaderboardProvider} from "@/app/leaders/api";

export default function LeadersPage (props: {searchParams: { page: string }}) {
  return (
      <div className="containerCustomPage">
        <h1 className="titlePage">Leaderboard</h1>
        <LeaderboardProvider>
            <LeaderboardContent page={props.searchParams.page} />
        </LeaderboardProvider>
      </div>
  )
}
