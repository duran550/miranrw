import React from 'react';
import FormHeader from '../header/header';

type FirstStepProps = {
  firstStepTranslation: { title: string; description: string };
};

const FirstStep: React.FC<FirstStepProps> = ({ firstStepTranslation }) => {
  return (
    <FormHeader
      title={firstStepTranslation?.title}
      subTitle={firstStepTranslation?.description}
    />
  );
};

export default FirstStep;
