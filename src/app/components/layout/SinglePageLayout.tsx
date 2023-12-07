import React, { ReactNode } from 'react';
import { Button } from '../button/Button';

type SinglePageLayoutProps = {
  children: ReactNode;
  buttonTitle: string;
  lang: string;
};

const SinglePageLayout: React.FC<SinglePageLayoutProps> = ({
  children,
  buttonTitle,
  lang,
}) => {
  return (
    <div className="relative w-full ">
      <div className=" lg:pb-0">{children}</div>

      <div className="absolute w-[20rem] right-0 -top-24 mb-auto">
        {/* <Button className="rounded-full w-full" href={`/${lang}/report`}>
          {buttonTitle && buttonTitle}
        </Button> */}
      </div>
    </div>
  );
};

export default SinglePageLayout;
