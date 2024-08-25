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
  mandatory?:string;
};

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subTitle,
  description,
  lang,
  children,
  mandatory
}) => {

  console.log(mandatory, 'mandatory')

  return (
    <div className="lg:bg-white mb-8 md:mb-12 border-primaryColor border-2 rounded-md p-4">
      <h1 className=" font-Rubik font-black text-2xl mb-2">
        {title}
        {/* {mandatory ? <span className='font-bold'>{mandatory}</span> : ''} */}
        </h1>
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
                <Link target="_blank" href={`/${lang}/datenschutz`}>
                  {description?.datenschutz}
                </Link>
              </AnimateClick>
            </div>
          </div>
        </div>
      )}

      <div className="my-2">
      {subTitle ? <span className='font-base'>{subTitle}</span> : ''}
      {mandatory ? <span className='font-black text-sm'>{mandatory}</span> : ''}
      </div>
    </div>
  );
};

export default FormHeader;
