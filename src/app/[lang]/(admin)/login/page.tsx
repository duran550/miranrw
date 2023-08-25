'use client';

import LoginForm from './components/form/LoginForm';

const login = () => {
  return (
    <div className="pt-0 h-screen bg-slate-300 flex flex-col items-center justify-center">
      <div className="font-bold">Logo</div>
      <LoginForm />
    </div>
  );
};

export default login;
