import { CategoryType, ReportAndCategoryType, reportType, reportType2 } from '@/utils/shared-types';

export type LoginParams = {
  email: string;
  password: string;
  remember?: boolean;
};

export type UserDataType = {
  id: string;
  fullname: string;
  email: string;

  role: number;
  token: string;
};
export type CategorizeType = {
  arraySave: { text: string; level: string; category: string; id: string }[];
  addarraySave: (data: {
    text: string;
    level: string;
    category: string;
    id: string;
  }) => void;
  text: string;
  setTextHandler: (value: string) => void;
  isShow: boolean;
  arrayIdCate: CategoryType[];
  arrayId: string[];
  resetHandler: () => void;
  addId: (id: string) => void;
  arrayDefaultCat: { ebene1?: string; ebene2?: string; ebene3?: string }[];
  addDefaulCat: (val: string[]) => void;
  addcategory: (id: CategoryType[]) => void;
  fillReportCategory: (id: ReportAndCategoryType[]) => void;
  fillArraySave: (
    valu: {
      text: string;
      level: string;
      category: string;
    }[]
  ) => void;
  addReportCategory: (id: ReportAndCategoryType) => void;

  arrayReportAndCategory: ReportAndCategoryType[];
  IshowHandler: (value: boolean) => void;
};
export type AuthValuesType = {
  reports: reportType2[];
  reportsRecents: reportType2[];
  loading: boolean;
  logout: () => void;
  IshowHandler: () => void;

  setUser: (value: UserDataType | undefined) => void;
  user: UserDataType | undefined;
  setLoading?: (value: UserDataType | undefined) => void;
  login: (params: UserDataType) => void;
  setReports: (value: reportType[]) => void;
  setReportsRecent: (value: reportType[]) => void;
  setNumbers: (val1: number, val2: number) => void;
  isShow: boolean;
  totalWeek: number;
  total: number;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;
