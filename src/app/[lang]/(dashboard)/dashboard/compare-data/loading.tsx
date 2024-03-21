import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-[60vh] flex flex-col gap-y-5">
      <div className="h-full rounded-xl w-full bg-slate-100 animate-pulse"></div>
    </div>
  );
};

export default Loading;
