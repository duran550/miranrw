'use client';

import React, { Dispatch, createContext, useReducer } from 'react';
import { SHOW_DRAWER } from './constants';

type AdminType = {
  showDrawer: boolean;
  cleanerDesc: string;
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: AdminType = {
  showDrawer: false,
  cleanerDesc: '',
};

const reducer = (initialState: AdminType, action: ActionType) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...initialState,
        showDrawer: !initialState.showDrawer,
      };
    case 'SET_CLEANER_DES':
      return {
        ...initialState,
        cleanerDesc: action.payload,
      };
    default:
      return initialState;
  }
};

export const AdminContext = createContext<{
  state: AdminType;
  dispatch: Dispatch<ActionType>;
  setCleanerDes: (cleanerDesc: string) => void;
}>({ state: initialState, dispatch: () => null, setCleanerDes: () => null });

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCleanerDes = (cleanerDesc: string) => {
    dispatch({ type: 'SET_CLEANER_DES', payload: cleanerDesc });
  };

  return (
    <AdminContext.Provider value={{ state, dispatch, setCleanerDes }}>
      {children}
    </AdminContext.Provider>
  );
};
