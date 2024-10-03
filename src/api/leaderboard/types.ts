export interface IGetLeaderBoard {
  leaderboard: ILeaderboardItem[];
  pages: number;
}

export interface ILeaderboardItem {
  [steamId: string]: {
    stats: Stats;
    data: Data;
    pos: number;
  };
}

export interface Data {
  name: string;
  avatar: string;
}

export interface Stats {
  p_score: number;
  kp_total: number;
  d_player: number;
  p_lastjoin: number;
}
