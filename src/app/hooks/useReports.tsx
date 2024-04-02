import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const UseReport = () => {
  const auth = useContext(AuthContext);
  const report = auth.reports;
  const setReports = auth.setReports;
  return { report, setReports };
};
