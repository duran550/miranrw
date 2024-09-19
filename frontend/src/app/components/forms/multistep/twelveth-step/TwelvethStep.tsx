import React from 'react';
import { Button } from '@/app/components/button/Button';
import { clearFormCookies } from '@/cookies/cookies';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { TwelvethStepProps } from './twelvethStep';
import { usePathname } from 'next/navigation';

const TwelvethStep: React.FC<TwelvethStepProps> = ({
  twelvethStepTranslation,
}) => {
  const pathname = usePathname();
  const handleClickButton = () => {
    clearFormCookies();
    window.location.href = '/' + pathname.split('/')[1] + '/about-us';
  };

  useScrollOnTop();
  return (
    <div className="h-96">
      <div className="border border-primaryColor p-8 rounded-lg">
        <div className="font-bold text-2xl">
          {twelvethStepTranslation?.title}
        </div>
        <div className="my-4">{twelvethStepTranslation?.description}</div>
        <div className="max-w-xs">
          <Button onClick={() => handleClickButton()}>
            {twelvethStepTranslation?.button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TwelvethStep;
