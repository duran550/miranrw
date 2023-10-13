import React from 'react';
import FormHeader from '../header/header';
import { TenthStepProps } from './tenthStep';
import { Button } from '@/app/components/button/Button';
import { useFormContext } from '@/app/hooks/useFormContext';
import { clearFormStep } from '@/cookies/cookies';

const TenthStep: React.FC<TenthStepProps> = ({ tenthStepTranslation }) => {
  const { dispatch } = useFormContext();
  return (
    <div className="border lg:bg-white mb-8 md:mb-16 border-primaryColor rounded-lg p-4">
      <h1 className="font-bold w-64 text-2xl">{tenthStepTranslation?.title}</h1>
      <p className="mt-2 w-96">{tenthStepTranslation?.description}</p>
      <Button className="mt-8 w-64 mb-8" onClick={() => clearFormStep()}>
        {tenthStepTranslation?.buttonText}
      </Button>
    </div>
  );
};

export default TenthStep;
