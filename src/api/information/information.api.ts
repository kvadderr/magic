import { IGetServersRes} from "@/api/servers/types";
import apiInstance from '../instance/instance'

export const InformationApi = {

  async getServers() {
    return apiInstance.get<IGetServersRes>('/page/custom/1')
  }

}
