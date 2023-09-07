'use client';
import React from 'react';
import Stepper from '../stepper/Stepper';
import { useFormContext } from '@/app/hooks/useFormContext';
import FirstStep from './first-step/FirstStep';
import SecondStep from './second-step/SecondStep';
import ThirdStep from './third-step/ThirdStep';
import { Button } from '../../button/Button';
import { NEXT_STEP, PREV_STEP, SUBMIT_FORM } from '@/app/context/actions';
import FourthStep from './fourth-step/FourthStep';
import FifthStep from './fifth-step/FifthStep';

type MultiStepFormValuesProps = {
  stepper: {
    firstStep: any;
    secondStep: any;
    thirdStep: any;
    fourthStep: any;
    fifthStep: any;
  };
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
        <Stepper
          progress={step === 2 ? 20 : step === 3 ? 40 : step === 4 ? 80 : 100}
        />
      )}

      <div>
        {step == 1 ? (
          <FirstStep
            firstStepTranslation={formTranslation?.stepper?.firstStep}
          />
        ) : step === 2 ? (
          <SecondStep
            secondStepTranslation={formTranslation?.stepper?.secondStep}
          />
        ) : step === 3 ? (
          <ThirdStep
            thirdStepTranslation={formTranslation?.stepper?.thirdStep}
          />
        ) : step === 4 ? (
          <FourthStep
            fourthStepTranslation={formTranslation?.stepper?.fourthStep}
          />
        ) : (
          <FifthStep
            fifthStepTranslation={formTranslation?.stepper?.fifthStep}
          />
        )}
      </div>

      {step !== 1 ? (
        <div className="flex space-x-0 md:space-x-16 justify-between md:flex-row  md:justify-between items-center w-full">
          <Button
            className="w-32 font-bold ml-auto"
            variant="primary"
            onClick={() => dispatch({ type: PREV_STEP })}
          >
            {formTranslation.button.prev}
          </Button>
          {step === 5 ? (
            <Button
              className="w-32 font-bold ml-auto"
              variant="primary"
              onClick={() => dispatch({ type: SUBMIT_FORM, payload: 'DATA 2' })}
            >
              {formTranslation.button.submit}
            </Button>
          ) : (
            <Button
              className="w-32 font-bold ml-auto"
              variant="primary"
              onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
            >
              Next
            </Button>
          )}
        </div>
      ) : (
        <Button
          className="w-32 font-bold ml-auto"
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
