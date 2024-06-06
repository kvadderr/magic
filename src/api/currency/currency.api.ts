import apiInstance from '../instance/instance'

export const CurrencyApi = {
  async getCurrency(rubs: number) {
    return apiInstance.get<any>(`store/currency/?id=15&rubs=${rubs}&isPack=false`);
  }
}
