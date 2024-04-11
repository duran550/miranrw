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
    data: { fullname: string; password: string; email: string; role: number },
    config?: any
  ): Promise<{ data: { message: string; result: any }; status: number }> => {
    return this.post('/api/user/', data);
  };

  getUsers = (): Promise<{ data: any; status: number }> => {
    return this.get('/api/user/');
  };

  refreshToken = (): Promise<{ data: any; status: number }> => {
    return this.get('/api/auth/refresh');
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
}
