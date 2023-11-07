import React from 'react';
import { Button } from '@/app/components/button/Button';
import { clearFormCookies } from '@/cookies/cookies';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { EleventhStepProps } from './eleventhStep';

const EleventhStep: React.FC<EleventhStepProps> = ({
  eleventhStepTranslation,
}) => {
  const handleClickButton = () => {
    clearFormCookies();
    window?.location?.reload();
  };

  useScrollOnTop();
  return (
    <div className="h-96">
      <div className="border border-primaryColor p-8 rounded-lg">
        <div className="font-bold text-2xl">
          {eleventhStepTranslation?.title}
        </div>
        <div className="my-4">{eleventhStepTranslation?.description}</div>
        <div className="max-w-xs">
          <Button onClick={() => handleClickButton()}>
            {eleventhStepTranslation?.button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EleventhStep;
