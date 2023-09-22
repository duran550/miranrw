import React from 'react';

type FormHeaderProps = {
  title: string;
  description?: {
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
    fourthParagraph: string;
  };
  subTitle?: string;
};

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subTitle,
  description,
}) => {
  return (
    <div className="border mb-8 md:mb-16 border-primaryColor rounded-md p-4">
      <div className=" font-extrabold text-xl">{title}</div>
      {description && (
        <div className="text-sm mt-2">
          <p>{description?.firstParagraph}</p>{' '}
          <p className="py-2">{description?.secondParagraph}</p>
          <p className="py-2">{description?.thirdParagraph}</p>
          <p>{description?.fourthParagraph}</p>
        </div>
      )}
      {subTitle ? <div className="my-2">{subTitle}</div> : ''}
    </div>
  );
};

export default FormHeader;
