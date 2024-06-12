export interface IGetServersRes {
  sections: IGetSectionsRes[]
}

export interface IGetSectionsRes {
  id: number;
  html: string;
  icon: string | null;
  title: string;
}

export interface monitoringServers {
  maxServerOnline: number;
  result: serverInfo[];
  sumPlayers: number;
}

export interface serverInfo {
  IP: string;
  currentOnline: number;
  maxPlayers: number;
  name: string;
  port: string;
  serverID: number;
}