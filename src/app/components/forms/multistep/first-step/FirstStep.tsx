import React from 'react';
import FormHeader from '../header/header';
import { Button } from '@/app/components/button/Button';
import { useFormContext } from '@/app/hooks/useFormContext';
import { NEXT_STEP } from '@/app/context/actions';

type FirstStepProps = {
  firstStepTranslation: { title: string; description: any; buttonText: string };
  lang: string;
};

const FirstStep: React.FC<FirstStepProps> = ({
  firstStepTranslation,
  lang,
}) => {
  const { dispatch } = useFormContext();
  return (
    <div>
      <FormHeader
        title={firstStepTranslation?.title}
        description={firstStepTranslation?.description}
        lang={lang}
      />
      <Button
        onClick={() => dispatch({ type: NEXT_STEP, payload: '' })}
        className="md:max-w-xs"
      >
        {firstStepTranslation?.buttonText}
      </Button>
    </div>
  );
};

export default FirstStep;
