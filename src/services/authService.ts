import DataService from './dataService';

export default class AuthService extends DataService {
  login = (data: {
    password: string;
    email: string;
  }): Promise<{
    headers: any;
    data: {
      status: string;
      message: string;
      user: {
        _id: string;
        fullname: string;
        email: string;
        password: string;
        role: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }[];
    };
    status: number;
  }> => {
    return this.post('/api/auth/', data);
  };

  register = (
    data: { fullname: string; password: string; email: string; role: string },
    config?: any
  ): Promise<{ data: { message: string }; status: number }> => {
    return this.post('/api/user/', data);
  };

  getUsers = (): Promise<{ data: any; status: number }> => {
    return this.get('/api/user/');
  };

  //   changePassword = (data: any) => {
  //     return this.post('/auth/changePassword', data)
  //   }

  //   sendResetPasswordEmail = (data: any) => {
  //     return this.post('/auth/sendResetPasswordEmail', data)
  //   }

  forgottenPassword = (data: any) => {
    return this.post('/auth/forgottenPassword', data);
  };

  updateUser = {};

  //   getProfile = (data: any) => {
  //     return this.get(`/auth/user/${data}`);
  //   };

  //   getUser = (data: any) => {
  //     return this.get(`/user/${data}`);
  //   };
}
