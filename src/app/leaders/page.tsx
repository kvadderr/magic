import LeaderboardContent from "@/app/leaders/leaders-content";
import {LeaderboardProvider} from "@/app/leaders/api";

export default function LeadersPage () {
  return (
      <div className="containerCustomPage">
        <h1 className="titlePage">Leaderboard</h1>
        <LeaderboardProvider>
            <LeaderboardContent />
        </LeaderboardProvider>
      </div>
  )
}
