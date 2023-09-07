import { DatePicker } from 'antd';
import React, { useState } from 'react';
import InputField from '../../text-field/InputField';
import SelectField from '../../select-field/SelectField';
import TextArea from '../../text-area/TextArea';
import RadioGroup from '../../radio/RadioGroup';
import { identity } from './secondFormData';
import FormHeader from '../header/header';

const SecondStep = () => {
  return (
    <div className="h-full">
      <FormHeader title="Wer ist betroffen ?" />
      <RadioGroup options={identity} title="" />
    </div>
  );
};

export default SecondStep;
