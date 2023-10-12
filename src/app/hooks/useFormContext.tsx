import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormContext = () => {
  const { state, dispatch } = useContext(FormContext);
  let step = state.step;
  let formData = state.formData;
  let reportingPerson: 'myself' | 'andere' | 'organization' | 'onBehalf' =
    state?.reportingPerson;

  let formErrors: boolean = state?.formErrors;
  return { step, formData, reportingPerson, formErrors, dispatch };
};
