import apiInstance from '../instance/instance'
import {IGetBanList} from "@/api/banlist/types";

export const BanListApi = {
  async getBanList(page: number) {
    return apiInstance.get<IGetBanList>('/servers/ban?count=10&&page=' + page)
  }
}
