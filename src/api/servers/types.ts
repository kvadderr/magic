export interface IGetServersRes {
  sections: IGetSectionsRes[];
}

export interface IServer {
  serverID: number; // Идентификатор сервера
  name: string; // Название сервера
  IP: string; // IP-адрес сервера
  port: number; // Порт сервера
  currentOnline: number; // Текущее количество игроков онлайн
  maxPlayers: number; // Максимальное количество игроков
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
