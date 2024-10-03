export type IServersListResponse = IServersListItem[];

export interface IServersListItem {
  id: number;
  serverTypeId: number;
  IP: string;
  port: number | string;
  apiKey: string;
  name: string;
  serverID: number;
}
