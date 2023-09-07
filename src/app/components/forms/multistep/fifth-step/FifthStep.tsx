import React from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import { choices } from './FifthStepData';

const FifthStep = () => {
  return (
    <div>
      <FormHeader
        title="Auf was bezog sich die Diskriminierung deiner Meinung nach ?"
        subTitle="Mehrfachnennung möglich"
      />
      {choices.map((choice: any) => (
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
