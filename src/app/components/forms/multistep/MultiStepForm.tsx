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
import SixthStep from './sixth-step/SixthStep';
import SeventhStep from './seventh-step/SeventhStep';
import EightStep from './eigth-step/EightStep';
import ThirdStepOrganization from './third-step/ThirdStepOrganization';
import FourthStepOrganization from './fourth-step/FourthStepOrganization';
import { getFormStep } from '@/cookies/cookies';
import TwelvethStep from './twelveth-step/TwelvethStep';
import EleventhStep from './eleventh-step/EleventhStep';
import TenthStep from './tenth-step/TenthStep';
import { MultiStepFormProps } from './multiStepForm';
import NinethStep from './nineth-step/NinethStep';

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  formTranslation,
  lang,
}) => {
  const { step, dispatch, formErrors, reportingPerson, isEditing } =
    useFormContext();
  let stepFromCookies = getFormStep();
  return (
    <div className="lg:flex lg:w-full lg:justify-between">
      <div className="lg:max-w-xl lg:mb-16">
        {step === 1 ? (
          <FirstStep
            lang={lang}
            firstStepTranslation={formTranslation?.stepper?.firstStep}
          />
        ) : (
          <div>
            {step === 1 || step === 10 || step === 11 || step === 12 ? (
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
                                ? 80
                                : step === 9
                                  ? 90
                                  : 100
                }
              />
            )}

            {reportingPerson !== 'organization' ? (
              <div className="mb-6">
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
                ) : step === 10 ? (
                  <TenthStep
                    tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                  />
                ) : step === 11 ? (
                  <EleventhStep
                    eleventhStepTranslation={
                      formTranslation?.stepper?.eleventhStep
                    }
                  />
                ) : (
                  <TwelvethStep
                    twelvethStepTranslation={
                      formTranslation?.stepper?.twelvethStep
                    }
                  />
                )}
              </div>
            ) : (
              /* Organization scenario */
              <div className="mb-6">
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
                  <ThirdStep
                    id="fourthForm"
                    thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                  />
                ) : step === 6 ? (
                  <FourthStep
                    id="fifthForm"
                    fourthStepTranslation={formTranslation?.stepper?.fourthStep}
                  />
                ) : step === 7 ? (
                  <FifthStep
                    id="sixthForm"
                    fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                  />
                ) : step === 8 ? (
                  <SeventhStep
                    id="seventhForm"
                    seventhStepTranslation={
                      formTranslation?.stepper?.seventhStep
                    }
                  />
                ) : step === 9 ? (
                  <EightStep
                    id="eighthForm"
                    eightStepTranslation={formTranslation?.stepper?.eightStep}
                  />
                ) : step === 10 ? (
                  <NinethStep
                    id="ninethForm"
                    ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                  />
                ) : step === 11 ? (
                  <EleventhStep
                    eleventhStepTranslation={
                      formTranslation?.stepper?.eleventhStep
                    }
                  />
                ) : (
                  <TwelvethStep
                    twelvethStepTranslation={
                      formTranslation?.stepper.twelvethStep
                    }
                  />
                )}
              </div>
              /* End of Organization scenario */
            )}

            {/* Buttons section */}

            {isEditing &&
            stepFromCookies !== 10 &&
            stepFromCookies !== 11 &&
            stepFromCookies !== 12 &&
            reportingPerson === 'myself' ? (
              <Button
                form={`${
                  stepFromCookies === 2
                    ? 'firstForm'
                    : stepFromCookies === 3
                      ? 'secondForm'
                      : stepFromCookies === 4
                        ? 'thirdForm'
                        : stepFromCookies === 5
                          ? 'fourthForm'
                          : stepFromCookies === 6
                            ? 'fifthForm'
                            : stepFromCookies === 7
                              ? 'sixthForm'
                              : stepFromCookies === 8
                                ? 'seventhForm'
                                : step === 9
                                  ? 'eighthForm'
                                  : 'ninethForm'
                }`}
                disabled={formErrors && true}
                variant={`${formErrors ? 'disabled' : 'primary'}`}
              >
                {formTranslation?.button.save}
              </Button>
            ) : (
              <>
                {step !== 1 ? (
                  <div className="flex  space-x-0 md:space-x-16 justify-between md:flex-row  md:justify-between items-center w-full">
                    {step !== 11 && step !== 12 && (
                      <>
                        {reportingPerson === 'organization' && step === 11 ? (
                          <></>
                        ) : (
                          <Button
                            className="w-32 mr-auto justify-self-start font-bold"
                            variant="primary"
                            onClick={() => dispatch({ type: PREV_STEP })}
                          >
                            {formTranslation.button.prev}
                          </Button>
                        )}
                      </>
                    )}
                    {step === 11 && reportingPerson !== 'organization' ? (
                      <div className="flex justify-between w-full">
                        <Button
                          className="w-32 mr-auto justify-self-start font-bold"
                          variant="primary"
                          onClick={() => dispatch({ type: PREV_STEP })}
                        >
                          {formTranslation.button.prev}
                        </Button>
                        <Button
                          form={`${'tenthForm'}`}
                          className="w-full lg:mr-auto lg:w-72 rounded-full py-4 font-bold"
                          disabled={formErrors && true}
                          variant={`${formErrors ? 'disabled' : 'primary'}`}
                        >
                          {formTranslation.button.submit}
                        </Button>
                      </div>
                    ) : (
                      <>
                        {reportingPerson === 'organization' && step === 11 && (
                          <div className="flex justify-between w-full">
                            <Button
                              className="w-32 mr-auto justify-self-start font-bold"
                              variant="primary"
                              onClick={() => dispatch({ type: PREV_STEP })}
                            >
                              {formTranslation.button.prev}
                            </Button>
                            <Button
                              form={`${'ninethForm'}`}
                              className="w-full lg:mr-auto lg:w-72 rounded-full py-4 font-bold"
                              disabled={formErrors && true}
                              variant={`${formErrors ? 'disabled' : 'primary'}`}
                            >
                              {formTranslation.button.submit}
                            </Button>
                          </div>
                        )}
                        {step !== 11 && step !== 12 && (
                          <>
                            {/* {' Conditions for organization last form'} */}
                            {step === 11 &&
                            reportingPerson === 'organization' ? (
                              <></>
                            ) : (
                              <Button
                                form={`${
                                  stepFromCookies === 2
                                    ? 'firstForm'
                                    : stepFromCookies === 3
                                      ? 'secondForm'
                                      : stepFromCookies === 4
                                        ? 'thirdForm'
                                        : stepFromCookies === 5
                                          ? 'fourthForm'
                                          : stepFromCookies === 6
                                            ? 'fifthForm'
                                            : stepFromCookies === 7
                                              ? 'sixthForm'
                                              : stepFromCookies === 8
                                                ? 'seventhForm'
                                                : stepFromCookies === 9
                                                  ? 'eighthForm'
                                                  : 'ninethForm'
                                }`}
                                className="w-32 font-bold ml-auto"
                                disabled={formErrors && true}
                                variant={`${
                                  formErrors ? 'disabled' : 'primary'
                                }`}
                              >
                                {formTranslation.button.next}
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {reportingPerson !== 'organization' && (
                      <Button
                        form={`${
                          stepFromCookies === 2
                            ? 'firstForm'
                            : stepFromCookies === 3
                              ? 'secondForm'
                              : stepFromCookies === 4
                                ? 'thirdForm'
                                : stepFromCookies === 5
                                  ? 'fourthForm'
                                  : stepFromCookies === 6
                                    ? 'fifthForm'
                                    : stepFromCookies === 7
                                      ? 'sixthForm'
                                      : stepFromCookies === 8
                                        ? 'seventhForm'
                                        : stepFromCookies === 9
                                          ? 'eighthForm'
                                          : 'ninethForm'
                        }`}
                        className="w-32 font-bold ml-auto"
                        disabled={formErrors && true}
                        variant={`${formErrors ? 'disabled' : 'primary'}`}
                      >
                        {formTranslation.button.next}
                      </Button>
                    )}
                  </>
                )}
              </>
            )}

            {/* End of Buttons section */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
