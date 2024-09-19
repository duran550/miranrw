import axios from 'axios';
import {
  getRefreshToken,
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from '@/cookies/cookies';
import { useAuth } from '@/app/hooks/useAuth';
// import { cookies } from 'next/headers';
const API_URL = process.env.REACT_APP_API_URL;
const user = getUserCookies();
// console.log('get',getRefreshToken());

// if (user) {
//   console.log('user.token', user.token);
// }
// async function refreshToken(token: string) {
//   try {
//     const response = await fetch('/api/auth/' + token, {
//       method: 'GET',
//       headers: { Authorization: token },
//     });
//     if (!response.ok) {
//       console.log('================================', response.json());

//       throw new Error('Failed to fetch users');
//     }
//     console.log('await response.json()');

//     //  return ;
//   } catch (error) {
//     console.error('Error token:', error);
//     throw error; // Re-throw the error to handle it in the component
//   }

// }
// if (user) {
//   refreshToken(user.token)
//   // console.log('oui');
  
// }

export default class DataService {
  
  client: any;
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'content-type': 'application/json',
        'Authorization': `${user ? user.token : ''}`,
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
