import { IGetServersRes} from "@/api/servers/types";
import apiInstance from '../instance/instance'

export const ServersApi = {

  async getServers() {
    return apiInstance.get<IGetServersRes>('/page/custom/2')
  }

}
