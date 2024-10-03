import { IGetTypesRes } from './types';
import apiInstance from '../instance/instance';

export const revalidate = 3600;

export const StoreApi = {
  async getTypes() {
    return apiInstance.get<IGetTypesRes[]>('/store/types');
    //apiInstance.get<IGetTypesRes[]>('/store/types')
  },
  async getProducts(id: number) {
    return apiInstance.get<Product[]>('/store/catalog/' + id);
  },
  async getPrice(id: number, amount: number) {
    return apiInstance.get<{ finalPrice: number; type: string }>(
      `/store/price`,
      {
        params: {
          id,
          amount,
        },
      },
    );
  },
  async buyProduct(token: string, body: any) {
    return apiInstance.post(
      '/store/buy',
      {
        body,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
