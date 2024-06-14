import apiInstance from '../instance/instance'
import {IGetLeaderBoard} from "@/api/leaderboard/types";

export const LeaderboardApi = {
  async getLeaderboard(page: number, id: number) {
    return apiInstance.get<IGetLeaderBoard>(`/servers/leaders?count=5&page=${page}&id=${id}`)
  },
  async getLeaderboardTop(id: number) {
    return apiInstance.get<IGetLeaderBoard>(`/servers/top/${id}`)
  }
}
