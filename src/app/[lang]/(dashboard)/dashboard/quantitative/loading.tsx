import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col gap-y-5">
      <div className="h-24 rounded-xl w-full bg-slate-300 animate-pulse"></div>
      <div className="h-full rounded-xl w-full bg-slate-300 animate-pulse"></div>
    </div>
  );
};

export default Loading;
