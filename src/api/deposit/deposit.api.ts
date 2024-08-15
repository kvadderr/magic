import apiInstance from '../instance/instance'

export const DepositApi = {
  async getPaymentLink(amount: number, currency: string, token: string, method: string) {
    return apiInstance.get<string>(`orders?amount=${amount}&currency=${currency}&method=${method}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  
}
