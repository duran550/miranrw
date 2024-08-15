import { reportType, reportType2 } from '@/utils/shared-types';

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
