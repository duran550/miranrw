'use client';
import React from 'react';
import Stepper from '../stepper/Stepper';
import { useFormContext } from '@/app/hooks/useFormContext';
import FirstStep from './first-step/FirstStep';
import SecondStep from './second-step/SecondStep';
import ThirdStep from './third-step/ThirdStep';
import { Button } from '../../button/Button';
import { NEXT_STEP, PREV_STEP, SUBMIT_FORM } from '@/app/context/actions';

type MultiStepFormValuesProps = {
  stepper: any;
  formFields: any;
  button: any;
};

type MultiStepFormProps = {
  formTranslation: MultiStepFormValuesProps;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ formTranslation }) => {
  const { step, dispatch } = useFormContext();
  return (
    <div>
      {step === 1 ? (
        ''
      ) : (
        <Stepper stepperTranslation={formTranslation.stepper} />
      )}

      <div>
        {step == 1 ? (
          <FirstStep />
        ) : step === 2 ? (
          <SecondStep />
        ) : (
          <ThirdStep />
        )}
      </div>

      {step !== 1 ? (
        <div className="flex space-x-0 md:space-x-16 flex-col md:flex-row  md:justify-between items-center w-full">
          <Button
            variant="primary"
            onClick={() => dispatch({ type: PREV_STEP })}
          >
            {formTranslation.button.prev}
          </Button>
          {step === 3 ? (
            <Button
              variant="primary"
              onClick={() => dispatch({ type: SUBMIT_FORM, payload: 'DATA 2' })}
            >
              {formTranslation.button.submit}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
            >
              {formTranslation.button.next}
            </Button>
          )}
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
        >
          {formTranslation.button.next}
        </Button>
      )}
    </div>
  );
};

export default MultiStepForm;
