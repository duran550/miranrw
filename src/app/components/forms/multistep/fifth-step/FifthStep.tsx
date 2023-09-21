import React from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';

type FifthStepProps = {
  fifthStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation }) => {
  return (
    <div>
      <FormHeader
        title={fifthStepTranslation?.title}
        subTitle={fifthStepTranslation?.description}
      />
      {fifthStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={''}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
    </div>
  );
};

export default FifthStep;
