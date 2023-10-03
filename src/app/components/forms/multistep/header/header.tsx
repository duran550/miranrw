import Link from 'next/link';
import React, { ReactNode } from 'react';

type FormHeaderProps = {
  children?: ReactNode;
  title: string;
  description?: {
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
    fourthParagraph: string;
    disclaimer: string;
    datenschutz: string;
    explanation: string;
  };
  subTitle?: string;
};

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subTitle,
  description,
  children,
}) => {
  return (
    <div className="border lg:bg-white mb-8 md:mb-16 border-primaryColor rounded-md p-4">
      <div className=" font-extrabold text-2xl mb-2">{title}</div>
      {children}
      {description && (
        <div className="text-sm mt-2">
          <p>{description?.firstParagraph}</p>{' '}
          <p className="py-2">{description?.secondParagraph}</p>
          <p className="py-2">{description?.thirdParagraph}</p>
          <p>{description?.fourthParagraph}</p>
          <div className="flex my-4 items-center space-x-4 font-bold">
            <p>
              <Link href="#">{description?.disclaimer}</Link>
            </p>
            <p>
              <Link href="/datenschutz">{description?.datenschutz}</Link>
            </p>
            <p>
              <Link href="#">{description?.explanation}</Link>
            </p>
          </div>
        </div>
      )}
      {subTitle ? <div className="my-2">{subTitle}</div> : ''}
    </div>
  );
};

export default FormHeader;
