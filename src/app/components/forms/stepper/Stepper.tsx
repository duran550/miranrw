'use client';
import { useFormContext } from '@/app/hooks/useFormContext';
import React from 'react';

type StepperProps = {
  progress: number;
};

const Stepper: React.FC<StepperProps> = ({ progress }) => {
  const { step } = useFormContext();
  return (
    <div className="w-full bg-gray-200 mb-12 md:mb-12 rounded-full h-2.5 ">
      <div
        className="bg-primaryColor h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Stepper;
