import React from 'react';

import RadioGroup from '../../radio/RadioGroup';
import { identity } from './secondFormData';
import FormHeader from '../header/header';

type SecondStepProps = {
  secondStepTranslation: {
    title: string;
    description: string;
    options: Array<{
      id: string;
      name: string;
      label: string;
      checked: boolean;
    }>;
  };
};

const SecondStep: React.FC<SecondStepProps> = ({ secondStepTranslation }) => {
  return (
    <div className="h-full mb-16">
      <FormHeader title={secondStepTranslation?.title} />
      <RadioGroup options={secondStepTranslation?.options} title="" />
    </div>
  );
};

export default SecondStep;
