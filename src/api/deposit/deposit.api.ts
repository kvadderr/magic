import apiInstance from '../instance/instance'

export const DepositApi = {
  async getPaymentLink(amount: number, currency: string, token: string) {
    return apiInstance.get<string>(`orders?amount=${amount}&currency=${currency}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  
}
