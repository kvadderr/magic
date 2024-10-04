import apiInstance from '@/api/instance/instance';
//import { steamLoginData } from '@/api/auth/types';
import {
  IGetDetailsData,
  IGetInventoryResponse,
  Gift,
  UserGift,
} from '@/api/user/types';

export const UserApi = {
  async getMe(token: string) {
    return apiInstance.get(`/users/whoAmI/${token}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  async getBalance(token: string) {
    return apiInstance.get<{ balance: number }>(`/profile/balance`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  async getInventory(token: string, page: number, count: number) {
    return apiInstance.get<IGetInventoryResponse>(
      `/profile/inventory?count=${count}&page=${page}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },

  async getUserGifts(token: string, userId: number): Promise<UserGift[]> {
    const response = await apiInstance.get<UserGift[]>(
      `/users/${userId}/gifts`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Возвращаем данные, соответствующие типу UserGift[]
  },

  async getDetails(token: string, page: number, count: number, sort: string) {
    return apiInstance.get<IGetDetailsData>(
      `profile/details?count=${count}&page=${page}&sort=${sort}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },
  async refundProduct(token: string, id: number) {
    return apiInstance.put(
      `/profile/refund/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },

  async getGiftsByLevel(level: number, token: string): Promise<Gift[]> {
    const response = await apiInstance.get<Gift[]>(
      `/users/giftsByLevel/${level}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Возвращаем данные, соответствующие типу Gift[]
  },

  async checkUserLevel(token: string, userId: number) {
    return apiInstance.get(`/users/${userId}/checkLevel`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  // Новый метод для привязки подарка к пользователю
  async linkUserGift(
    token: string,
    steamId: string,
    productId: string,
    quantity: number,
  ) {
    return apiInstance.get(`/api-rust/product.give`, {
      params: {
        product: productId,
        token: token,
        steamid: steamId,
        quanity: quantity,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  async transferFunds(
    token: string,
    senderSteamId: string,
    recipientSteamId: string,
    amount: number,
  ) {
    return apiInstance.post(
      `/users/transfer`,
      { senderSteamId, recipientSteamId, amount },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },

  async linkInventoryToServer(
    token: string,
    userId: number,
    productId: number,
    serverId: number,
  ) {
    return apiInstance.put(
      `/profile/sendToServer?userId=${userId}&productId=${productId}&serverId=${serverId}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
