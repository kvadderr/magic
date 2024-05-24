export interface IGetBanList {
  banlist: IBanListItem[],
  pages: number,
}

export interface IBanListItem {
  steamid: string,
  nickname: string,
  reason: string,
  time: number,
  banip: number
}
