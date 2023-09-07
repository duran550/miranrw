import React from 'react';
import TextArea from '../../text-area/TextArea';
import FormHeader from '../header/header';

const ThirdStep = () => {
  return (
    <div className="h-full">
      <FormHeader
        title="Vorfallbeschreibung"
        subTitle="Was genau ist passiert ?"
      />
      <TextArea name="vorfall" props={''} title="" placeholder="" />
    </div>
  );
};

export default ThirdStep;
