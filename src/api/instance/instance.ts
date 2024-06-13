import axios from 'axios';
import https from 'https';

const instance = axios.create( {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // WARNING: This disables SSL certificate validation
  }),
  baseURL: 'https://mrust.ru/api/',
} );

instance.interceptors.response.use( response => response, error => {

  if ( !error.response ) {

    console.error( 'Сервер не отвечает', error.request );

  } else if ( !error.response.data ) {

    console.error( 'Нет данных в ответе', error.response );
    console.error( 'Сервер вернул ошибку:', error.response );

  }

  return Promise.reject( error );

} );

export default instance
