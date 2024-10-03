import apiInstance from '../instance/instance';
import { IServersListResponse } from '@/api/serversList/types';

export const ServersListApi = {
  async getServersList() {
    return apiInstance.get<IServersListResponse>('/servers/server');
  },
};
