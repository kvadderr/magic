import apiInstance from "@/api/instance/instance";
import {steamLoginData} from "@/api/auth/types";


export const UserApi = {
  async getBalance(token: string) {
    return apiInstance.get<{balance: number}>(`profile/balance`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
}