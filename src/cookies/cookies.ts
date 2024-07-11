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
  REFRESH_TOKEN,
  SHOW
} from './cookies.d';


export const setRefreshToken = (data: any) => {
  console.log('data',data);
  
  cookies.set(REFRESH_TOKEN, data);
};
export const getRefreshToken = () => {
   const data = cookies.get(REFRESH_TOKEN);
   console.log('data', data);

   return data ? data : undefined;
};
export const setUserCookies = (data: any) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const removeRefreshToken = () => {
  cookies.remove(REFRESH_TOKEN);
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  console.log('data',data);
  
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};

// export const getUserCookies = () => {
//   const data = cookies.get(USER_DATA);
//   console.log('data', data);

//   return data ? JSON.parse(data) : undefined;
// };
export const setShow = (data: string) => {
  console.log('data', data);

  cookies.set(SHOW, data);
};
export const removeShow = () => {
  cookies.remove(SHOW);
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

export const clearFormCookiesStep = (step:string) => {
  cookies.remove(step);

}
