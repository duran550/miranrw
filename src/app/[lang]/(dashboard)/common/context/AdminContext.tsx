'use client';

import React, { Dispatch, createContext, useReducer } from 'react';
import { SHOW_DRAWER } from './constants';

type AdminType = {
  showDrawer: boolean;
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: AdminType = {
  showDrawer: false,
};

const reducer = (initialState: AdminType, action: ActionType) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...initialState,
        showDrawer: !initialState.showDrawer,
      };

    default:
      return initialState;
  }
};

export const AdminContext = createContext<{
  state: AdminType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
