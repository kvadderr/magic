import apiInstance from "@/api/instance/instance";
import {IGetBanList} from "@/api/banlist/types";

export const UserAPi = {
  async getBanList(page: number) {
    return apiInstance.get<IGetBanList>('/servers/ban?count=10&page=' + page)
  },
  async getBalance() {
    return apiInstance.get("profile/balance")
  },
  async getInventory(page: number, count: number) {
    return apiInstance.get("profile/inventory")
  },
  async getDetails(page: number, count: number, sort: number) {
    return apiInstance.get("profile/details")
  }
}
