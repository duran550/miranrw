import AnimateClick from '@/app/components/animate-click/AnimateClick';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type FormHeaderProps = {
  children?: ReactNode;
  title: string;
  lang?: string;
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
  lang,
  children,
}) => {
  return (
    <div className="border lg:bg-white mb-8 md:mb-16 border-primaryColor rounded-md p-4">
      <div className=" font-extrabold text-2xl mb-2">{title}</div>
      {children}
      {description && (
        <div className="text-sm mt-2">
          <div>{description?.firstParagraph}</div>{' '}
          <div className="py-2">{description?.secondParagraph}</div>
          <div className="py-2">{description?.thirdParagraph}</div>
          <div>{description?.fourthParagraph}</div>
          <div className="flex my-4 items-center space-x-4 font-bold">
            <div>
              <AnimateClick>
                <Link target="_blank" href={`/${lang}/disclaimer`}>
                  {description?.disclaimer}
                </Link>
              </AnimateClick>
            </div>
            <div>
              <AnimateClick>
                <Link target="_blank" href={`/${lang}/datenschutz`}>
                  {description?.datenschutz}
                </Link>
              </AnimateClick>
            </div>
            <div>
              <AnimateClick>
                <Link target="_blank" href={`/${lang}/statement`}>
                  {description?.explanation}
                </Link>
              </AnimateClick>
            </div>
          </div>
        </div>
      )}
      {subTitle ? <div className="my-2">{subTitle}</div> : ''}
    </div>
  );
};

export default FormHeader;
