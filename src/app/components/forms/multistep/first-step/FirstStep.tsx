import React from 'react';
import FormHeader from '../header/header';
import { Button } from '@/app/components/button/Button';
import { useFormContext } from '@/app/hooks/useFormContext';
import { NEXT_STEP } from '@/app/context/actions';
import { useRouter } from 'next/navigation';

type FirstStepProps = {
  firstStepTranslation: {
    title: string;
    description: any;
    buttonText: string;
    secondButtonText: string;
  };
  lang: string;
};

const FirstStep: React.FC<FirstStepProps> = ({
  firstStepTranslation,
  lang,
}) => {
  const { dispatch } = useFormContext();
  const router = useRouter();

  return (
    <div>
      <FormHeader
        title={firstStepTranslation?.title}
        description={firstStepTranslation?.description}
        lang={lang}
        paddingHorizontal={3}
        paddingTop={1}
      />
      <div className="flex justify-between">
        <Button
          onClick={() => router.push(`/${lang}/datenschutz`)}
          className="md:max-w-xs w-fit"
        >
          {firstStepTranslation?.secondButtonText}
        </Button>
        <Button
          onClick={() => dispatch({ type: NEXT_STEP, payload: '' })}
          className="md:max-w-xs w-fit"
        >
          {firstStepTranslation?.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default FirstStep;
