import apiInstance from "@/api/instance/instance";
import {steamLoginData} from "@/api/auth/types";
import {IGetDetailsData, IGetInventoryResponse} from "@/api/user/types";


export const UserApi = {
  async getBalance(token: string) {
    return apiInstance.get<{balance: number}>(`/profile/balance`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  async getInventory(token: string, page: number, count: number) {
    return apiInstance.get<IGetInventoryResponse>(`/profile/inventory?count=${count}&page=${page}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  async getDetails(token: string, page: number, count: number, sort: string) {
    return apiInstance.get<IGetDetailsData>(`profile/details?count=${count}&page=${page}&sort=${sort}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}