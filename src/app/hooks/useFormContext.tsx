import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormContext = () => {
  const { state, dispatch } = useContext(FormContext);
  let step = state.step;
  let formData = state.formData;
  return { step, formData, dispatch };
};
