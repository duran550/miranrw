import React from 'react';

type FormHeaderProps = {
  title: string;
  subTitle?: string;
};

const FormHeader: React.FC<FormHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="border mb-8 md:mb-16 border-primaryColor rounded-md p-4">
      <div className=" font-extrabold text-2xl">{title}</div>
      {subTitle ? <div className="my-2">{subTitle}</div> : ''}
    </div>
  );
};

export default FormHeader;
