import apiInstance from '../instance/instance'
import {IGetBanList} from "@/api/banlist/types";

export const BanListApi = {
  async getBanList() {
    return apiInstance.get<IGetBanList>('/servers/ban?count=10000&page=1')
  }
}
