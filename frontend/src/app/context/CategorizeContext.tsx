'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  CategorizeType,
  ErrCallbackType,
  LoginParams,
  UserDataType,
} from './types';
// import { useRouter } from 'next/router';
import {
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from '@/cookies/cookies';
import AuthService from '@/services/authService';
import { AxiosResponse } from 'axios';
import {
  CategoryType,
  ReportAndCategoryType,
  reportType,
} from '@/utils/shared-types';
import { boolean, number } from 'joi';
import { useRouter } from 'next/navigation';
// import { categoryType } from '../api/models/category';

const defaultProvider: CategorizeType = {
  text: '',
  arraySave: [],
  arrayId: [],
  arrayDefaultCat: [],
  addDefaulCat: () => {},
  resetHandler: () => {},
  addarraySave: () => {},
  addReportCategory: () => {},
  addId: () => {},
  setTextHandler: () => {},
  arrayIdCate: [],
  addcategory: () => {},
  arrayReportAndCategory: [],
  isShow: false,
  IshowHandler: (value) => {},
  fillReportCategory: (value: ReportAndCategoryType[]) => { },
  fillArraySave:()=>{}
};

const CategorizeContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const CategoryProvider = ({ children }: Props) => {
  // ** States
  const [category, setCategory] = useState(defaultProvider.arrayIdCate);
  const [Reportcategory, setReportCategory] = useState(
    defaultProvider.arrayReportAndCategory
  );
  const [arrayId, setarrayId] = useState(defaultProvider.arrayId);
  const [arrayDefaultCat, setarraydefaulCat] = useState(defaultProvider.arrayDefaultCat);
  const [show, setShow] = useState(false);
  const [arraySave, setArraySave] = useState(defaultProvider.arraySave);
  const [text, setText] = useState('');

  // ** Hooks
  const router = useRouter();

  //   useEffect(() => {
  //     const initAuth = async (): Promise<void> => {
  //       const userData: UserDataType = await getUserCookies();

  //       if (userData) {
  //         setUser({ ...userData });
  //       }
  //       setLoading(false);
  //     };

  //     initAuth();
  //   }, []);

  const handlerCategory = (cat: CategoryType[]) => {
    setCategory(cat);
  };
 
  const resetHandler = () => {
    setArraySave([])
    setText('')
    setShow(false)
    // setCategory([])
    // setarraydefaulCat([])
    setarrayId([])
    // setReportCategory([])
}
  const handleShow = (value: boolean) => {
    setShow(value);
  };

  const setArrayReportHandler = (value: ReportAndCategoryType[]) => {
    setReportCategory(value);
  };
    
     const addDefaulCat = (value: any[]) => {
       setarraydefaulCat(value);
     };
  const setTexthandler = (val: string) => {
    setText(val);
  };

  const fillArraySave = (values: any[]) => {
    setArraySave(values)
  }
  const addArraysave = (data: {
    text: string;
    level: string;
    category: string;
    id:string
  }) => {
    setArraySave([...arraySave, data]);
  };
    const addReportCategory = (value: ReportAndCategoryType) => {
        setReportCategory([...Reportcategory,value])
    }
     const addId = (val:string) => {
       setarrayId([...arrayId, val]);
     };
  const handleLogin = (
    // params: LoginParams,
    // errorCallback?: ErrCallbackType
    user: UserDataType
  ) => {
    // setUser(user);

    // new AuthService()
    //   .login(params)
    //   .then( (result) => {
    //     setLoading(false);

    //     // const { data, status } = response as AxiosResponse<UserDataType, any>;
    //     if (result.status === 200) {
    //       const returnUrl = router.query.returnUrl;
    //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

    //       // Found users and setting parameters into cookies
    setUserCookies(user);
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

  //   const handleLogout = () => {
  //     removeUserCookies();
  //     setUser(undefined);
  //     router.push('/login');
  //   };

  const values: CategorizeType = {
    fillArraySave,
      resetHandler,
        addDefaulCat,
      arrayDefaultCat,
    setTextHandler: setTexthandler,
    arrayIdCate: category,
    addcategory: handlerCategory,
    arrayReportAndCategory: Reportcategory,
    IshowHandler: handleShow,
    isShow: show,
    fillReportCategory: setArrayReportHandler,
    text,
    addarraySave: addArraysave,
    arraySave: arraySave,
    addId,
    arrayId,
    addReportCategory,
  };

  return (
    <CategorizeContext.Provider value={values}>
      {children}
    </CategorizeContext.Provider>
  );
};

export { CategorizeContext, CategoryProvider };
