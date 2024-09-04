'use client';
import { useFormContext } from '@/app/hooks/useFormContext';
import React from 'react';

type StepperProps = {
  progress: number;
};

const Stepper: React.FC<StepperProps> = ({ progress }) => {
  const { step } = useFormContext();
  return (
    <div className="w-full mb-12 rounded-full bg-[#EDEBF6]">
      <div
        className="bg-primaryColor h-2.5 rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Stepper;
