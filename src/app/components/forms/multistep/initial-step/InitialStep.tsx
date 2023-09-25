import React from 'react';
import FormHeader from '../header/header';
import { Button } from '@/app/components/button/Button';
import { NEXT_STEP } from '@/app/context/actions';
import { useFormContext } from '@/app/hooks/useFormContext';

type InitialStepProps = {
  initialStepTranslation: {
    title: string;
    description: string;
  };
};

const InitialStep: React.FC<InitialStepProps> = ({
  initialStepTranslation,
}) => {
  const { dispatch } = useFormContext();
  return (
    <div className="mb-64 lg:mb-[12rem] lg:max-w-lg lg:mx-auto">
      <h1 className="font-bold text-3xl mb-6">MIQ</h1>
      <FormHeader
        title={initialStepTranslation?.title}
        subTitle={initialStepTranslation?.description}
      />
      <Button
        onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
        className="rounded-full"
        variant="primary"
      >
        {initialStepTranslation?.title}
      </Button>
    </div>
  );
};

export default InitialStep;
