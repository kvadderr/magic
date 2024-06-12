import {IGetServersRes, monitoringServers} from "@/api/servers/types";
import apiInstance from '../instance/instance'

export const ServersApi = {

  async getServers() {
    return apiInstance.get<IGetServersRes>('/page/custom/2')
  },
  async getScaleServers() {
    return apiInstance.get<monitoringServers>("/servers");
  }

}
