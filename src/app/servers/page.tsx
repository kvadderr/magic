import {ServersApi} from "@/api/servers/servers.api";
import {CustomPage} from "@/shared/components/CustomPage/CustomPage";

export default async function ServerPage() {
  const {serversList} = await getServers()
  return <CustomPage sections={serversList.sections} label="Сервера"/>
}

async function getServers() {
  const res = await ServersApi.getServers()
  return {serversList: res.data}
}
