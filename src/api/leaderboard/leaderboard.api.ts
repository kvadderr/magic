import apiInstance from '../instance/instance';
import { IGetLeaderBoard } from '@/api/leaderboard/types';

export const LeaderboardApi = {
  async getLeaderboard(id: number) {
    return apiInstance.get<IGetLeaderBoard>(
      `/servers/leaders?count=10000&page=1&id=${id}`,
    );
  },
  async getLeaderboardTop(id: number) {
    return apiInstance.get<IGetLeaderBoard>(`/servers/top/${id}`);
  },
};
