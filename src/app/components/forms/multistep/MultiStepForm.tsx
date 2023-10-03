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
import FormHeader from './header/header';
import FifthStep from './fifth-step/FifthStep';
import SixthStep from './sixth-step/SixthStep';
import SeventhStep from './seventh-step/SeventhStep';
import EightStep from './eigth-step/EightStep';
import NinethStep from './nineth-step/NinethStep';
import TenthStep from './tenth-step/TenthStep';
import ThirdStepOrganization from './third-step/ThirdStepOrganization';
import FourthStepOrganization from './fourth-step/FourthStepOrganization';

type MultiStepFormValuesProps = {
  stepper: {
    initialStep: any;
    firstStep: any;
    secondStep: any;
    thirdStep: any;
    thirdStepOrganization: any;
    fourthStep: any;
    fourthStepOrganization: any;
    fifthStep: any;
    sixthStep: any;
    seventhStep: any;
    eightStep: any;
    ninethStep: any;
    tenthStep: any;
  };
  button: { start: string; next: string; prev: string; submit: string };
};

type MultiStepFormProps = {
  formTranslation: MultiStepFormValuesProps;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ formTranslation }) => {
  const { step, dispatch, formErrors, reportingPerson } = useFormContext();
  return (
    <div className="lg:flex lg:w-full lg:justify-between">
      <div className="lg:max-w-xl lg:mb-16">
        {step === 1 ? (
          <FirstStep
            firstStepTranslation={formTranslation?.stepper?.firstStep}
          />
        ) : (
          <div>
            {step === 1 || step == 2 || step === 10 ? (
              ''
            ) : (
              <Stepper
                progress={
                  step === 2
                    ? 10
                    : step === 3
                    ? 20
                    : step === 4
                    ? 30
                    : step === 5
                    ? 40
                    : step === 6
                    ? 50
                    : step === 7
                    ? 70
                    : step === 8
                    ? 85
                    : 100
                }
              />
            )}

            {reportingPerson !== 'organization' ? (
              <div className="">
                {step === 2 ? (
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
                ) : step === 5 ? (
                  <FifthStep
                    fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                  />
                ) : step === 6 ? (
                  <SixthStep
                    sixthStepTranslation={formTranslation?.stepper?.sixthStep}
                  />
                ) : step === 7 ? (
                  <SeventhStep
                    seventhStepTranslation={
                      formTranslation?.stepper?.seventhStep
                    }
                  />
                ) : step === 8 ? (
                  <EightStep
                    eightStepTranslation={formTranslation?.stepper?.eightStep}
                  />
                ) : step === 9 ? (
                  <NinethStep
                    ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                  />
                ) : (
                  <TenthStep
                    tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                  />
                )}
              </div>
            ) : (
              /* Organization scenario */
              <div className="">
                {step === 2 ? (
                  <SecondStep
                    secondStepTranslation={formTranslation?.stepper?.secondStep}
                  />
                ) : step === 3 ? (
                  <ThirdStepOrganization
                    thirdStepOrganizationTranslation={
                      formTranslation?.stepper?.thirdStepOrganization
                    }
                  />
                ) : step === 4 ? (
                  <FourthStepOrganization
                    fourthStepOrganizationTranslation={
                      formTranslation?.stepper?.fourthStepOrganization
                    }
                  />
                ) : step === 5 ? (
                  <FifthStep
                    fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                  />
                ) : step === 6 ? (
                  <SixthStep
                    sixthStepTranslation={formTranslation?.stepper?.sixthStep}
                  />
                ) : step === 7 ? (
                  <SeventhStep
                    seventhStepTranslation={
                      formTranslation?.stepper?.seventhStep
                    }
                  />
                ) : step === 8 ? (
                  <EightStep
                    eightStepTranslation={formTranslation?.stepper?.eightStep}
                  />
                ) : step === 9 ? (
                  <NinethStep
                    ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                  />
                ) : (
                  <TenthStep
                    tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                  />
                )}
              </div>
              /* End of Organization scenario */
            )}

            {step !== 1 ? (
              <div className="flex  space-x-0 md:space-x-16 justify-between md:flex-row  md:justify-between items-center w-full">
                {step !== 9 && step !== 10 && (
                  <Button
                    className="w-32 mr-auto justify-self-start font-bold"
                    variant="primary"
                    onClick={() => dispatch({ type: PREV_STEP })}
                  >
                    {formTranslation.button.prev}
                  </Button>
                )}
                {step === 9 ? (
                  <Button
                    className="w-full lg:mr-auto lg:w-72 rounded-full py-4 font-bold"
                    disabled={formErrors && true}
                    variant={`${formErrors ? 'disabled' : 'primary'}`}
                    onClick={() =>
                      dispatch({ type: NEXT_STEP, payload: 'DATA 2' })
                    }
                  >
                    {formTranslation.button.submit}
                  </Button>
                ) : (
                  step !== 10 && (
                    <Button
                      className="w-32 font-bold ml-auto"
                      disabled={formErrors && true}
                      variant={`${formErrors ? 'disabled' : 'primary'}`}
                      onClick={() =>
                        dispatch({ type: NEXT_STEP, payload: 'DATA 1' })
                      }
                    >
                      {formTranslation.button.next}
                    </Button>
                  )
                )}
              </div>
            ) : (
              <Button
                className="w-32 font-bold ml-auto"
                disabled={formErrors && true}
                variant={`${formErrors ? 'disabled' : 'primary'}`}
                onClick={() => dispatch({ type: NEXT_STEP, payload: 'DATA 1' })}
              >
                {formTranslation.button.next}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
