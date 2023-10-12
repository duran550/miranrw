'use client';

import React, { Dispatch, createContext, useReducer } from 'react';
import {
  FORM_ERRORS,
  NEXT_STEP,
  PREV_STEP,
  REPORTING_PERSON,
  SUBMIT_FORM,
} from './actions';
import { getFormStep, setFormStep } from '@/cookies/cookies';

type FormType = {
  step: number;
  formData: Array<any>;
  reportingPerson: 'myself' | 'andere' | 'organization' | 'onBehalf';
  formErrors: boolean;
};

type ActionType = {
  payload?: any;
  type: string;
};

const initialState: FormType = {
  step: getFormStep(),
  formData: [],
  reportingPerson: 'myself',
  formErrors: true,
};

const reducer = (initialState: FormType, action: ActionType) => {
  switch (action.type) {
    case NEXT_STEP:
      setFormStep(initialState?.step + 1);
      return {
        ...initialState,
        step: getFormStep(),
        formData: [initialState.formData, ...action.payload],
      };

    case PREV_STEP:
      setFormStep(initialState?.step - 1);
      return {
        ...initialState,
        step: getFormStep(),
      };

    case FORM_ERRORS:
      return {
        ...initialState,
        formErrors: action?.payload,
      };

    case REPORTING_PERSON:
      return {
        ...initialState,
        reportingPerson: action?.payload,
      };

    case SUBMIT_FORM:
      return {
        ...initialState,
      };

    default:
      return initialState;
  }
};

export const FormContext = createContext<{
  state: FormType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
