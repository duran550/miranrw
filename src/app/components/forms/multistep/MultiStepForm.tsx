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
import InitialStep from './initial-step/InitialStep';
import SixthStep from './sixth-step/SixthStep';
import FormHeader from './header/header';

type MultiStepFormValuesProps = {
  stepper: {
    initialStep: any;
    firstStep: any;
    secondStep: any;
    thirdStep: any;
    fourthStep: any;
    fifthStep: any;
    sixthStep: any;
  };
  button: { start: string; next: string; prev: string; submit: string };
};

type MultiStepFormProps = {
  formTranslation: MultiStepFormValuesProps;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ formTranslation }) => {
  const { step, dispatch } = useFormContext();
  return (
    <div className="lg:flex lg:w-full lg:justify-between">
      {' '}
      <div className="lg:max-w-lg lg:mb-16">
        {step === 1 ? (
          <InitialStep
            initialStepTranslation={formTranslation?.stepper?.initialStep}
          />
        ) : (
          <div>
            {step === 1 || step == 2 ? (
              ''
            ) : (
              <Stepper
                progress={
                  step === 3
                    ? 20
                    : step === 4
                    ? 30
                    : step === 5
                    ? 70
                    : step === 6
                    ? 90
                    : 100
                }
              />
            )}

            <div className="">
              {step === 2 ? (
                <FirstStep
                  firstStepTranslation={formTranslation?.stepper?.firstStep}
                />
              ) : step === 3 ? (
                <SecondStep
                  secondStepTranslation={formTranslation?.stepper?.secondStep}
                />
              ) : step === 4 ? (
                <ThirdStep
                  thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                />
              ) : step === 5 ? (
                <FourthStep
                  fourthStepTranslation={formTranslation?.stepper?.fourthStep}
                />
              ) : step === 6 ? (
                <FifthStep
                  fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                />
              ) : (
                <SixthStep
                  sixthStepTranslation={formTranslation?.stepper?.sixthStep}
                />
              )}
            </div>

            {step !== 1 && step !== 2 ? (
              <div className="flex  space-x-0 md:space-x-16 justify-between md:flex-row  md:justify-between items-center w-full">
                <Button
                  className="w-32 font-bold ml-auto"
                  variant="primary"
                  onClick={() => dispatch({ type: PREV_STEP })}
                >
                  {formTranslation.button.prev}
                </Button>
                {step === 7 ? (
                  <Button
                    className="w-32 font-bold ml-auto"
                    variant="primary"
                    onClick={() =>
                      dispatch({ type: SUBMIT_FORM, payload: 'DATA 2' })
                    }
                  >
                    {formTranslation.button.submit}
                  </Button>
                ) : (
                  <Button
                    className="w-32 font-bold ml-auto"
                    variant="primary"
                    onClick={() =>
                      dispatch({ type: NEXT_STEP, payload: 'DATA 1' })
                    }
                  >
                    {formTranslation.button.next}
                  </Button>
                )}
              </div>
            ) : step === 2 ? (
              <Button
                className="w-32 mr-auto font-bold"
                variant="primary"
                onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
              >
                {formTranslation.button.start}
              </Button>
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
        )}
      </div>
      {step === 1 || step === 2 ? (
        ''
      ) : (
        <div className="hidden lg:block">
          <FormHeader title={'Mögliche relevante Informationen'}>
            <ul></ul>
          </FormHeader>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
