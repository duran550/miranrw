import axios from 'axios';
import {
  getRefreshToken,
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from '@/cookies/cookies';
const API_URL = process.env.REACT_APP_API_URL;
const token = getRefreshToken();
console.log('get',getRefreshToken());

// if (token) {
//   console.log('user.token', token.token);
// }

export default class DataService {
  client: any;
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token ? token : ''}`,
      },
    });
  }

  post = (url: string, data: any) => {
    return this.client.post(url, data);
  };

  get = (url: string) => {
    return this.client.get(url);
  };

  put = (url: string, data: any) => {
    return this.client.put(url, data);
  };

  delete = (url: string) => {
    return this.client.delete(url);
  };
}
