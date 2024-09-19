import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormContext = () => {
  const { state, dispatch } = useContext(FormContext);
  let step = state.step;
  let formData = state.formData;
  let reportingPerson: 'myself' | 'andere' | 'organization' | 'onBehalf' =
    state?.reportingPerson;
  let isEditing: boolean = state?.isEditing;
  let formErrors: boolean = state?.formErrors;
  let formValue:any=state.formValue;
  let id_:string=state.id
  return { step, formData, reportingPerson, formErrors, dispatch, isEditing,formValue, id_, };
};
