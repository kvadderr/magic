import apiInstance from '../instance/instance';

export const CurrencyApi = {
  async getCurrency({
    id,
    amount,
    rubs,
    isPack,
  }: {
    id: number;
    amount?: number;
    rubs?: number;
    isPack?: boolean;
  }) {
    return apiInstance.get<any>(`store/currency`, {
      params: {
        id,
        amount,
        rubs,
        isPack,
      },
    });
  },
};
