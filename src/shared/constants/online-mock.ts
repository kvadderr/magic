import {monitoringServers} from "@/api/servers/types";

const onlineMock: monitoringServers = {
  maxServerOnline: 1000,
  result: [
    {
      IP: "199.134.44.22",
      currentOnline: 995,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 2
    },
    {
      IP: "199.134.44.22",
      currentOnline: 0,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 4
    },
    {
      IP: "199.134.44.22",
      currentOnline: 300,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 3
    },
    {
      IP: "199.134.44.22",
      currentOnline: 534,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 5
    },
    {
      IP: "199.134.44.22",
      currentOnline: 534,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 5
    },
    {
      IP: "199.134.44.22",
      currentOnline: 534,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 5
    },
    {
      IP: "199.134.44.22",
      currentOnline: 534,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 5
    },
    {
      IP: "199.134.44.22",
      currentOnline: 534,
      maxPlayers: 1000,
      name: "Сервер",
      port: "3001",
      serverID: 5
    },
  ],
  sumPlayers: 560
}

export default onlineMock;