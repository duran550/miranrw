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
  SHOW,
  TENTH_FORM,
  ELEVENTH_STEP
} from './cookies.d';
const REPORTING_PERSON = 'ReportingPerson';


export const setRefreshToken = (data: any) => {
  console.log('data',data);
  
  cookies.set(REFRESH_TOKEN, data, { domain: '' });
};
export const getRefreshToken = () => {
   const data = cookies.get(REFRESH_TOKEN);
   console.log('data', data);

   return data ? data : undefined;
};
export const setUserCookies = (data: any) => {
  cookies.set(USER_DATA, JSON.stringify(data), { domain: '' });
};

export const removeRefreshToken = () => {
  cookies.remove(REFRESH_TOKEN, { domain: '' });
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  console.log('data',data);
  
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA, { domain: '' });
};

// export const getUserCookies = () => {
//   const data = cookies.get(USER_DATA);
//   console.log('data', data);

//   return data ? JSON.parse(data) : undefined;
// };
export const setShow = (data: string) => {
  console.log('data', data);

  cookies.set(SHOW, data, 
    // { domain: '' }
  );
};
export const removeShow = () => {
  cookies.remove(SHOW, { domain: '' });
};

// Setting FORM steps

export const getFormStep = (): number => {
  const step = cookies?.get(FORM_STEP);
  return step ? JSON.parse(step) : 1;
};

export const setFormStep = (step: number): void => {
  cookies.set(FORM_STEP, JSON.stringify(step), { expires: 1, domain:"" });
};

export const clearFormStep = (): void => {
  cookies.remove(FORM_STEP, { domain: '' });
};

// Form cookies

export const setFormCookies = (data: any, formData: string) => {
  cookies.set(formData, JSON.stringify(data), {
    expires: 7,
    domain: '',
  });
};

export const getFormCookies = (formData: string) => {
  const data = cookies.get(formData);
  return data ? JSON.parse(data) : undefined;
};

export const clearFormCookies = () => {
  cookies.remove(FORM_STEP , {domain:"" });
  cookies.remove(FIRST_FORM , {domain:"" });
  cookies.remove(SECOND_FORM , {domain:"" });
  cookies.remove(THIRD_FORM , {domain:"" });
  cookies.remove(FOURTH_FORM , {domain:"" });
  cookies.remove(FIFTH_FORM , {domain:"" });
  cookies.remove(SIXTH_FORM , {domain:"" });
  cookies.remove(SEVENTH_FORM , {domain:"" });
  cookies.remove(EIGTH_FORM , {domain:"" });
  cookies.remove(NINETH_FORM , {domain:"" });
  cookies.remove(TENTH_FORM , {domain:"" });
  cookies.remove(ELEVENTH_STEP , {domain:"" });
  cookies.remove(REPORTING_PERSON, { domain: '' });
};

export const clearFormCookiesStep = (step:string) => {
  cookies.remove(step, { domain: '' });

}

export const setReportingPerson = (identity: string) => {
  const value = identity === 'myself' ? 'myself' : identity === 'andere' ? 'andere' : 'organization';
  cookies.set(REPORTING_PERSON, value, { domain: '' });
  console.log(`ReportingPerson set to ${value}`);
};

export const getReportingPerson = () => {
  return cookies.get(REPORTING_PERSON);
};


export const removeReportingPerson = () => {
  cookies.remove(REPORTING_PERSON, { domain: '' });
};
