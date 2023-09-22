import React from 'react';
import FormHeader from '../header/header';

type FirstStepProps = {
  firstStepTranslation: { title: string; description: any };
};

const FirstStep: React.FC<FirstStepProps> = ({ firstStepTranslation }) => {
  return (
    <FormHeader
      title={firstStepTranslation?.title}
      description={firstStepTranslation?.description}
    />
  );
};

export default FirstStep;
