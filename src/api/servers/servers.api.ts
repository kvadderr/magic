import { IServer, monitoringServers } from '@/api/servers/types';
import apiInstance from '../instance/instance';

export const ServersApi = {
  async getServers(headers: Record<string, string> = {}) {
    // Вызов существующего эндпоинта для получения информации о серверах с передачей заголовков
    const response = await apiInstance.get<{
      result: IServer[];
      sumPlayers: number;
      maxServerOnline: number;
    }>('/servers', { headers });
    return response.data; // Вернем данные из ответа
  },
  async getScaleServers() {
    return apiInstance.get<monitoringServers>('/servers');
  },
};
