import apiInstance from '../instance/instance'

export const AuthApi = {
  async steamLogin(id: string, body: any) {
    return apiInstance.get(`/auth/openId/${id}`, {
      headers: {
        signature: body,
      }
    })
  },
  async logOut() {
    return apiInstance.get("/auth/logout")
  }
}
