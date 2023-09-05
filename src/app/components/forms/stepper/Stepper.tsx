'use client';
import { useFormContext } from '@/app/hooks/useFormContext';
import React from 'react';

type StepperValueProps = {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
};

type StepperProps = {
  stepperTranslation: StepperValueProps;
};

const Stepper: React.FC<StepperProps> = ({ stepperTranslation }) => {
  const { step } = useFormContext();
  return (
    <div className="w-full bg-gray-200 mb-16 rounded-full h-2.5 ">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: '1%' }}
      ></div>
    </div>
  );
};

export default Stepper;
