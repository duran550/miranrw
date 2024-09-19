import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const loginUser = auth.login;
  return { user, loginUser };
};
