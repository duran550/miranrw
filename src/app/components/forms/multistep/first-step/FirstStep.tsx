import React from 'react';
import FormHeader from '../header/header';

type FirstStepProps = {
  firstStepTranslation: { title: string; description: any };
};

const FirstStep: React.FC<FirstStepProps> = ({ firstStepTranslation }) => {
  return (
    <div>
      <FormHeader
        title={firstStepTranslation?.title}
        description={firstStepTranslation?.description}
      />
    </div>
  );
};

export default FirstStep;
