import React from 'react';
import TextArea from '../../text-area/TextArea';
import FormHeader from '../header/header';

type ThirdStepProps = {
  thirdStepTranslation: { title: string; description: string };
};

const ThirdStep: React.FC<ThirdStepProps> = ({ thirdStepTranslation }) => {
  return (
    <div className="h-full lg:w-[28rem]">
      <FormHeader
        title={thirdStepTranslation?.title}
        subTitle={thirdStepTranslation?.description}
      />
      <TextArea name="vorfall" props={''} title="" placeholder="" />
    </div>
  );
};

export default ThirdStep;
