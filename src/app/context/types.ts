import { reportType } from "@/utils/shared-types";

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
  toke:string
 
};

export type AuthValuesType = {
  reports: reportType[];
  loading: boolean;
  logout: () => void;
  setUser: (value: UserDataType | undefined) => void;
  user: UserDataType | undefined;
  setLoading: (value: UserDataType | undefined) => void;
  login: (params: UserDataType) => void;
  setReports: (value: reportType[]) => void;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;
