'use client';
import React, { useState } from 'react';

type FaqItemProps = {
  title?: string;
  content: string;
};

const FaqItem: React.FC<FaqItemProps> = ({ title, content }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      onClick={() => setToggle(!toggle)}
      className="border-b-[1px] cursor-pointer my-6 z-40 py-2 px-0 bg-white text-black border-primaryColor"
    >
      <div className="text-md">{title}</div>
      {toggle && <div className="my-4">{content}</div>}
    </div>
  );
};

export default FaqItem;
