import cookies from 'js-cookie';
import { FORM_STEP, USER_DATA } from './cookies.d';

export const setUserCookies = (data: any) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};

// Setting FORM steps

export const getFormStep = (): number => {
  const step = cookies?.get(FORM_STEP);
  return step ? JSON.parse(step) : 1;
};

export const setFormStep = (step: number): void => {
  cookies.set(FORM_STEP, JSON.stringify(step), { expires: 1 });
};

export const clearFormStep = (): void => {
  cookies.remove(FORM_STEP);
};
