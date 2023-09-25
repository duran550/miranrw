import React, { ReactNode } from 'react';
import { Button } from '../button/Button';

type SinglePageLayoutProps = {
  children: ReactNode;
  buttonTitle: string;
};

const SinglePageLayout: React.FC<SinglePageLayoutProps> = ({
  children,
  buttonTitle,
}) => {
  return (
    <div className="relative w-full ">
      <div className="pb-24 lg:pb-0">{children}</div>

      <Button className="absolute rounded-full max-w-md right-0 bottom-0">
        {buttonTitle && buttonTitle}
      </Button>
    </div>
  );
};

export default SinglePageLayout;
