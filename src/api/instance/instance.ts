import axios from 'axios';
import https from 'https';

export const baseURL = 'http://localhost:4500/';
//export const baseURL = 'https://magicrust.gg/api/';

const token =
  'eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MTBBN18yNTEzQTY0NV80MjEyOCIsICJzdWIiOiAiNzY1NjExOTk3NjYwOTgwOTIiLCAiYXVkIjogWyAid2ViOmNvbW11bml0eSIgXSwgImV4cCI6IDE3MjY4MjA3NTksICJuYmYiOiAxNzE4MDkyOTA0LCAiaWF0IjogMTcyNjczMjkwNCwgImp0aSI6ICIxMEFFXzI1MTNBNjQ2XzRFNTVEIiwgIm9hdCI6IDE3MjY3MzI5MDQsICJydF9leHAiOiAxNzQ0OTMxODI0LCAicGVyIjogMCwgImlwX3N1YmplY3QiOiAiOTQuMjM3LjEyNC4yNTEiLCAiaXBfY29uZmlybWVyIjogIjk0LjIzNy4xMjQuMjUxIiB9.j6mUIAdzCBT6kUt4MgP7wICu2QJZD3cZbA_Gj4R9VZbolBOQkcM6SuKkuZTQvMZ7R_EQCg9Es1igQxvTUCI3AQ';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // WARNING: This disables SSL certificate validation
  }),
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Сервер не отвечает', error.request);
    } else if (!error.response.data) {
      console.error('Нет данных в ответе', error.response);
      console.error('Сервер вернул ошибку:', error.response);
    }

    return Promise.reject(error);
  },
);

export default instance;
