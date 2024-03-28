import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  UserDataType,
} from './types';
import { useRouter } from 'next/router';
import {
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from '@/cookies/cookies';
import AuthService from '@/services/authService';
import { AxiosResponse } from 'axios';
import { reportType } from '@/utils/shared-types';

const defaultProvider: AuthValuesType = {
  user: getUserCookies(),
  loading: true,
  setUser: () => null,
  login: () => {},
  logout: () => {},
  setLoading: () => Boolean,
  reports: [],
  setReports:()=>{}
  
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | undefined>(defaultProvider.user);
  const [report, setReport] = useState<reportType[]>(
   []
  );

  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const userData: UserDataType = await getUserCookies();
      
      if (userData) {
        setUser({ ...userData });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handlerReport = (report:reportType[]) => {
  setReport(report)
}


  const handleLogin = (
    // params: LoginParams,
    // errorCallback?: ErrCallbackType
    user: UserDataType
  ) => {
    setUser(user);
    alert('ok')
    
    // new AuthService()
    //   .login(params)
    //   .then( (result) => {
    //     setLoading(false);

    //     // const { data, status } = response as AxiosResponse<UserDataType, any>;
    //     if (result.status === 200) {
    //       const returnUrl = router.query.returnUrl;
    //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

    //       // Found users and setting parameters into cookies
setUserCookies(user)
          // setUserCookies({ ...result.data, remember: params?.remember });
    //     } else {
    //       if (errorCallback) errorCallback({ message: result.data.message || '' });
    //     }
    //   })
    //   .catch((error: any) => {
    //     if (errorCallback) errorCallback(error);
    //   });
  };

  // Logout

  const handleLogout = () => {
    removeUserCookies();
    setUser(undefined);
    router.push('/login');
  };

  const values: any = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    reports:report,
    setReports: handlerReport,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
