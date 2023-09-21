'use client';

import React, { Dispatch, createContext, useReducer } from 'react';
import { NEXT_STEP, PREV_STEP, SUBMIT_FORM } from './actions';

type FormType = {
  step: number;
  formData: Array<any>;
};

type ActionType = {
  payload?: any;
  type: string;
};

const initialState: FormType = {
  step: 1,
  formData: [],
};

const reducer = (initialState: FormType, action: ActionType) => {
  switch (action.type) {
    case NEXT_STEP:
      return {
        ...initialState,
        step: initialState.step + 1,
        formData: [initialState.formData, ...action.payload],
      };

    case PREV_STEP:
      return {
        ...initialState,
        step: initialState.step - 1,
      };

    case SUBMIT_FORM:
      console.log(action.payload);
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
