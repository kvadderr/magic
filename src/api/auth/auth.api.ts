import apiInstance from '../instance/instance'
import {steamLoginData} from "@/api/auth/types";

export const AuthApi = {
  async steamLogin(id: string, body: any) {
    return apiInstance.get<steamLoginData>(`/auth/openId/${id}`, {
      headers: {
        signature: body,
      }
    })
  },
  async logOut() {
    return apiInstance.get("/auth/logout")
  }
}
