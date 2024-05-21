import {ServersApi} from "@/api/servers/servers.api";
import {InformationApi} from "@/api/information/information.api";
import {CustomPage} from "@/shared/components/CustomPage/CustomPage";

export default async function InfoPage () {
  const {serversList} = await getInformation()
  return <CustomPage sections={serversList.sections} label="Информация"/>
}

async function getInformation() {
  const res = await InformationApi.getServers()
  return {serversList: res.data}
}
