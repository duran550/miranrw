import cookies from 'js-cookie';
import {
  EIGTH_FORM,
  FIFTH_FORM,
  FIRST_FORM,
  FORM_STEP,
  FOURTH_FORM,
  NINETH_FORM,
  SECOND_FORM,
  SEVENTH_FORM,
  SIXTH_FORM,
  THIRD_FORM,
  USER_DATA,
} from './cookies.d';

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

// Form cookies

export const setFormCookies = (data: any, formData: string) => {
  cookies.set(formData, JSON.stringify(data), { expires: 7 });
};

export const getFormCookies = (formData: string) => {
  const data = cookies.get(formData);
  return data ? JSON.parse(data) : undefined;
};

export const clearFormCookies = () => {
  cookies.remove(FORM_STEP);
  cookies.remove(FIRST_FORM);
  cookies.remove(SECOND_FORM);
  cookies.remove(THIRD_FORM);
  cookies.remove(FOURTH_FORM);
  cookies.remove(FIFTH_FORM);
  cookies.remove(SIXTH_FORM);
  cookies.remove(SEVENTH_FORM);
  cookies.remove(EIGTH_FORM);
  cookies.remove(NINETH_FORM);
};
