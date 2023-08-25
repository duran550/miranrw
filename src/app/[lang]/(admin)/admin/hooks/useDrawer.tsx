import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

export const useDrawer = () => {
  const { state, dispatch } = useContext(AdminContext);

  let showDrawer = state?.showDrawer;
  return { showDrawer, dispatch };
};
