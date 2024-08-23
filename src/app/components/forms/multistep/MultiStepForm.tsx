'use client';
import React, { useState } from 'react';
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
import SubmitModal from './submitModal';
import ThirtinthStep from './thirtinth-step/ThirtinthStep';

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  formTranslation,
  lang,
}) => {
  const { step, dispatch, formErrors, reportingPerson, isEditing } =
    useFormContext();
  const [open, setOpen] = useState<boolean>(false)
  let stepFromCookies = getFormStep();

  console.log(stepFromCookies, 'stepFromCookies')
  console.log(reportingPerson, 'reportingPerson')

  return (
    <div>
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

              {reportingPerson == 'myself' ? (
                <div className="mb-16">
                  {step === 2 ? (
                    <SecondStep
                      secondStepTranslation={formTranslation?.stepper?.secondStep}
                    />
                  ) : step === 3 ? (
                    // <ThirdStep
                    //   thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                    // />
                    <TenthStep
                      tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                    />
                  ) : step === 4 ? (
                    <FourthStep
                      id='fifthForm'
                      fourthStepTranslation={formTranslation?.stepper?.fourthStep}
                    />
                  ) : step === 5 ? (
                    <FifthStep
                      fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                    />
                  ) : step === 6 ? (
                    // <SeventhStep
                    //   seventhStepTranslation={formTranslation?.stepper?.sixthStep}
                    //   lang={lang}
                    // />
                    <ThirtinthStep
                      id={'thirtinthForm'}
                      thirtinthStepTranslation={formTranslation?.stepper?.thirtinthStep}
                      lang={lang}
                    />

                  ) : step === 7 ? (
                    // <SixthStep
                    //   sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                    //   lang={lang}
                    // />
                    <ThirdStep
                      thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                      id='sixthForm'
                    />
                  ) : step === 8 ? (
                    // <EightStep
                    //   eightStepTranslation={formTranslation?.stepper?.eightStep}
                    // />
                    // <SixthStep
                    //   sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                    //   lang={lang}
                    // />
                    <SeventhStep
                      id='fifthForm'
                      seventhStepTranslation={formTranslation?.stepper?.sixthStep}
                      lang={lang}
                    />
                  ) : step === 9 ?
                    <SixthStep
                      sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                      lang={lang}
                      id='eighthForm'
                    />
                    : step === 10 ? (
                      // <NinethStep
                      //   ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                      // />
                      <EightStep
                        id='ninethForm'
                        eightStepTranslation={formTranslation?.stepper?.eightStep}
                      />
                    ) : step === 11 ? (
                      // <TenthStep
                      //   tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                      // />
                      <NinethStep
                        id='tenthForm'
                        ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                      />
                    ) : step === 12 ? (
                      <EleventhStep
                        eleventhStepTranslation={
                          formTranslation?.stepper?.eleventhStep
                        }
                        secondStepTranslation={formTranslation?.stepper?.secondStep}
                        open={open}
                        setOpen={() => setOpen(false)}
                      />
                    ) : (
                      <TwelvethStep
                        twelvethStepTranslation={
                          formTranslation?.stepper?.twelvethStep
                        }
                      />
                    )}
                </div>
              ) : reportingPerson == 'andere' ? (
                /* another person */
                <div className="mb-16">
                  {step === 2 ? (
                    <SecondStep
                      secondStepTranslation={formTranslation?.stepper?.secondStep}
                    />
                  ) : step === 3 ? (
                    // <ThirdStep
                    //   thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                    // />
                    <TenthStep
                      tenthStepTranslation={formTranslation?.stepper?.tenthStep}
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
                    // <SeventhStep
                    //   seventhStepTranslation={formTranslation?.stepper?.sixthStep}
                    //   lang={lang}
                    // />
                    <ThirtinthStep
                      id={'thirtinthForm'}
                      thirtinthStepTranslation={formTranslation?.stepper?.thirtinthStep}
                      lang={lang}
                    />

                  ) : step === 7 ? (
                    // <SixthStep
                    //   sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                    //   lang={lang}
                    // />
                    <ThirdStep
                      thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                      id='sixthForm'
                    />
                  ) : step === 8 ? (
                    // <EightStep
                    //   eightStepTranslation={formTranslation?.stepper?.eightStep}
                    // />
                    // <SixthStep
                    //   sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                    //   lang={lang}
                    // />
                    <SeventhStep
                      id='fifthForm'
                      seventhStepTranslation={formTranslation?.stepper?.sixthStep}
                      lang={lang}
                    />
                  )
                    : step === 9 ? (
                      // <NinethStep
                      //   ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                      // />
                      <EightStep
                        id='ninethForm'
                        eightStepTranslation={formTranslation?.stepper?.eightStep}
                      />
                    ) : step === 10 ? (
                      // <TenthStep
                      //   tenthStepTranslation={formTranslation?.stepper?.tenthStep}
                      // />
                      <NinethStep
                        id='tenthForm'
                        ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                      />
                    ) : step === 11 ? (
                      <EleventhStep
                        eleventhStepTranslation={
                          formTranslation?.stepper?.eleventhStep
                        }
                        secondStepTranslation={formTranslation?.stepper?.secondStep}
                        open={open}
                        setOpen={() => setOpen(false)}
                      />
                    ) : (
                      <TwelvethStep
                        twelvethStepTranslation={
                          formTranslation?.stepper?.twelvethStep
                        }
                      />
                    )}
                </div>
              ) :
                (
                  /* Organization scenario */
                  <div className="mb-14">
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
                      // <ThirdStep
                      //   id="fourthForms"
                      //   thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                      // />
                      <FourthStep
                        id="fifthForm"
                        fourthStepTranslation={formTranslation?.stepper?.fourthStep}
                      />
                    ) : step === 6 ? (
                      // <FourthStep
                      //   id="fifthForm"
                      //   fourthStepTranslation={formTranslation?.stepper?.fourthStep}
                      // />
                      <FifthStep
                        id="sixthForm"
                        fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                      />
                    ) : step === 7 ? (
                      // <FifthStep
                      //   id="sixthForm"
                      //   fifthStepTranslation={formTranslation?.stepper?.fifthStep}
                      // />
                      <ThirdStep
                        id="fourthForm"
                        thirdStepTranslation={formTranslation?.stepper?.thirdStep}
                      />
                    ) : step === 8 ? (
                      <SixthStep
                        id="seventhForm"
                        sixthStepTranslation={formTranslation?.stepper?.seventhStep}
                      />
                    ) : step === 9 ? (
                      <EightStep
                        id="eighthForm"
                        eightStepTranslation={formTranslation?.stepper?.eightStep}
                      />
                    ) : step === 10 ? (
                      <NinethStep
                        id="ninethForm"
                        // id="fourthForm"
                        ninethStepTranslation={formTranslation?.stepper?.ninethStep}
                      />
                    ) : step === 11 ? (
                      <EleventhStep
                        eleventhStepTranslation={
                          formTranslation?.stepper?.eleventhStep
                        }
                        secondStepTranslation={formTranslation?.stepper?.secondStep}
                        open={open}
                        setOpen={() => setOpen(false)}
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
                reportingPerson !== 'myself' &&
                reportingPerson !== 'andere' &&
                reportingPerson !== 'onBehalf' &&
                reportingPerson !== 'organization' ? (
                <></>
              ) : (
                // <Button
                //   form={`${
                //     stepFromCookies === 2
                //       ? 'firstForm'
                //       : stepFromCookies === 3
                //         ? 'secondForm'
                //         : stepFromCookies === 4
                //           ? 'thirdForm'
                //           : stepFromCookies === 5
                //             ? 'fourthForm'
                //             : stepFromCookies === 6
                //               ? 'fifthForm'
                //               : stepFromCookies === 7
                //                 ? 'sixthForm'
                //                 : stepFromCookies === 8
                //                   ? 'seventhForm'
                //                   : step === 9
                //                     ? 'eighthForm'
                //                     : 'ninethForm'
                //   }`}
                //   disabled={formErrors && true}
                //   variant={`${formErrors ? 'disabled' : 'primary'}`}
                // >
                //   {formTranslation?.button.save}
                // </Button>
                <>
                  {step !== 1 ? (
                    <div>
                      {
                        reportingPerson === 'myself' ? (
                          <div className={`${step !== 12 && 'flex'}`}>
                            {step && step !== 12 && step !== 13 && (
                              <>
                                <Button
                                  className="w-32 mr-auto justify-self-start font-bold"
                                  variant="primary"
                                  onClick={() => dispatch({ type: PREV_STEP })}
                                >
                                  {formTranslation.button.prev}
                                </Button>
                              </>
                            )}
                            <div>
                              {step === 12 &&
                                <div className='flex w-full'>
                                  <Button
                                    className="w-32 mr-auto justify-self-start font-bold"
                                    variant="primary"
                                    onClick={() => dispatch({ type: PREV_STEP })}
                                  >
                                    {formTranslation.button.prev}
                                  </Button>
                                  <Button
                                    // form={`${'tenthForm'}`}
                                    className="w-fit py-4 font-bold"
                                    onClick={() => setOpen(true)}
                                  // disabled={formErrors && true}
                                  // variant={`${formErrors ? 'disabled' : 'primary'}`}
                                  >
                                    {/* {formTranslation.button.submit} */}
                                    Erledigt
                                  </Button>
                                </div>}
                              {step !== 12 && step !== 13 &&
                                <Button
                                  // onClick={() => console.log('james jay')}
                                  form={`${stepFromCookies === 2
                                    ? 'firstForm'
                                    : stepFromCookies === 3
                                      ? 'secondForm'
                                      : stepFromCookies === 4
                                        ? 'fifthForm'
                                        : stepFromCookies === 5
                                          ? 'fourthForm'
                                          : stepFromCookies === 6
                                            // ? 'fifthForm'
                                            ? 'thirtinthForm'
                                            : stepFromCookies === 7
                                              ? 'sixthForm'
                                              : stepFromCookies === 8
                                                // ? 'seventhForm'
                                                ? 'fifthForm'
                                                : stepFromCookies === 9
                                                  ? 'eighthForm'
                                                  : stepFromCookies === 10 ? 'ninethForm'
                                                    : 'tenthForm'
                                    }`}
                                  className="w-32 font-bold ml-auto"
                                  disabled={formErrors && true}
                                  variant={`${formErrors ? 'disabled' : 'primary'
                                    }`}
                                >
                                  {formTranslation.button.next}
                                </Button>
                              }
                            </div>
                          </div>
                        )
                          : reportingPerson === 'andere' ? (
                            <div className={`${step !== 11 && 'flex'}`}>
                              {step !== 11 && step !== 12 && step !== 13 && (
                                <>
                                  <Button
                                    className="w-32 mr-auto justify-self-start font-bold"
                                    variant="primary"
                                    onClick={() => dispatch({ type: PREV_STEP })}
                                  >
                                    {formTranslation.button.prev}
                                  </Button>
                                </>
                              )}
                              <div>
                                {step === 11 &&
                                  <div className='flex'>
                                    <Button
                                      className="w-32 mr-auto justify-self-start font-bold"
                                      variant="primary"
                                      onClick={() => dispatch({ type: PREV_STEP })}
                                    >
                                      {formTranslation.button.prev}
                                    </Button>
                                    <Button
                                      // form={`${'tenthForm'}`}
                                      className="w-fit py-4 font-bold"
                                      onClick={() => setOpen(true)}
                                    // disabled={formErrors && true}
                                    // variant={`${formErrors ? 'disabled' : 'primary'}`}
                                    >
                                      {/* {formTranslation.button.submit} */}
                                      Erledigt
                                    </Button>
                                  </div>}
                                {step !== 11 && step !== 12 &&
                                  <Button
                                    // onClick={() => console.log('james jay')}
                                    form={`${stepFromCookies === 2
                                      ? 'firstForm'
                                      : stepFromCookies === 3
                                        ? 'secondForm'
                                        : stepFromCookies === 4
                                          ? 'thirdForm'
                                          : stepFromCookies === 5
                                            ? 'fourthForm'
                                            : stepFromCookies === 6
                                              // ? 'fifthForm'
                                              ? 'thirtinthForm'
                                              : stepFromCookies === 7
                                                ? 'sixthForm'
                                                : stepFromCookies === 8
                                                  // ? 'seventhForm'
                                                  ? 'fifthForm'
                                                  : stepFromCookies === 9
                                                    ? 'ninethForm'
                                                    : 'tenthForm'
                                      }`}
                                    className="w-32 font-bold ml-auto"
                                    disabled={formErrors && true}
                                    variant={`${formErrors ? 'disabled' : 'primary'
                                      }`}
                                  >
                                    {formTranslation.button.next}
                                  </Button>
                                }
                              </div>
                            </div>
                          )
                            :
                            (
                              <div className={`${step !== 11 && 'flex'}`}>
                                {step !== 11 && step !== 12 && step !== 13 && (
                                  <>
                                    <Button
                                      className="w-32 mr-auto justify-self-start font-bold"
                                      variant="primary"
                                      onClick={() => dispatch({ type: PREV_STEP })}
                                    >
                                      {formTranslation.button.prev}
                                    </Button>
                                  </>
                                )}
                                <div>
                                  {step === 11 &&
                                    <div className='flex'>
                                      <Button
                                        className="w-32 mr-auto justify-self-start font-bold"
                                        variant="primary"
                                        onClick={() => dispatch({ type: PREV_STEP })}
                                      >
                                        {formTranslation.button.prev}
                                      </Button>
                                      <Button
                                        // form={`${'tenthForm'}`}
                                        className="w-fit py-4 font-bold"
                                        onClick={() => setOpen(true)}
                                      // disabled={formErrors && true}
                                      // variant={`${formErrors ? 'disabled' : 'primary'}`}
                                      >
                                        {/* {formTranslation.button.submit} */}
                                        Erledigt
                                      </Button>
                                    </div>}
                                  {step !== 11 && step !== 12 &&
                                    <Button
                                      // onClick={() => console.log('james jay')}
                                      form={`${stepFromCookies === 2
                                        ? 'firstForm'
                                        : stepFromCookies === 3
                                          ? 'secondForm'
                                          : stepFromCookies === 4
                                            ? 'thirdForm'
                                            : stepFromCookies === 5
                                              ? 'fifthForm'
                                              : stepFromCookies === 6
                                                // ? 'fifthForm'
                                                ? 'sixthForm'
                                                // ? 'thirtinthForm'
                                                : stepFromCookies === 7
                                                  ? 'fourthForms'
                                                  // ? 'thirtinthForm'
                                                  : stepFromCookies === 8
                                                    ? 'seventhForm'
                                                    : stepFromCookies === 9
                                                      ? 'eighthForm'
                                                      : stepFromCookies === 10 ? 'ninethForm'
                                                        : 'tenthForm'
                                        }`}
                                      className="w-32 font-bold ml-auto"
                                      disabled={formErrors && true}
                                      variant={`${formErrors ? 'disabled' : 'primary'
                                        }`}
                                    >
                                      {formTranslation.button.next}
                                    </Button>
                                  }
                                </div>
                              </div>
                            )}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {/* End of Buttons section */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
