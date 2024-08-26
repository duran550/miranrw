import React, { useEffect, useRef, useState } from 'react';
import { EleventhFormValues, EleventhStepProps } from './eleventhStep';
import { useFormContext } from '@/app/hooks/useFormContext';
import { clearFormCookies, getFormCookies } from '@/cookies/cookies';
import FormHeader from '../header/header';
import Checkbox from '../../checkbox/Checkbox';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditBlock from './EditBlock';
import {
  EIGTH_FORM,
  ELEVENTH_STEP,
  FIFTH_FORM,
  FIRST_FORM,
  FOURTH_FORM,
  NINETH_FORM,
  SECOND_FORM,
  SEVENTH_FORM,
  SIXTH_FORM,
  TENTH_FORM,
  THIRD_FORM,
  THIRTINTH_FORM,
} from '@/cookies/cookies.d';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import ReportService from '@/services/reportService';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import dayjs from 'dayjs';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyCaptchaAction } from '@/app/components/captcha/Captcha';
import CaptchaCheckbox from '@/app/components/captcha/captcha-checkbox/CaptchaCheckbox';
import { error } from 'console';
import { identity } from '../first-step/firstFormData';
import { WidgetInstance } from 'friendly-challenge';
import SubmitModal from '../submitModal';
import SubmissionPage from '../../submittionPage/submission';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import { Button } from '@/app/components/button/Button';
import TwelvethStep from '../twelveth-step/TwelvethStep';
import TwelvethStepComponent from '../twelveth-step/twelvestepComp';

const EleventhStep: React.FC<EleventhStepProps> = ({
  eleventhStepTranslation,
  secondStepTranslation,
  open,
  setOpen,
  submitPage,
  setSubmitPage
}) => {
  // Scroll on top
  useScrollOnTop();

  console.log(submitPage, 'page')

  //scroll to top if submitPage is true
  useEffect(() => {
    // Scroll to the top whenever isOpen changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds a smooth scrolling animation
    });
  }, [submitPage]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { dispatch, formErrors, reportingPerson } = useFormContext();
  const [captchLoading, setCaptchaLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const container = useRef(null);
  const widget = useRef<any>(null);

  const doneCallback = (solution: any) => {
    console.log('Captcha was solved. The form can be submitted.');
  };

  const errorCallback = (err: any) => {
    // console.log('There was an error when trying to solve the Captcha.');
    // console.log(err);
  };

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'auto',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
      });
    }

    return () => {
      if (widget.current != undefined) widget.current.reset();
    };
  }, [container]);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EleventhFormValues>();


  console.log(
    getFormCookies(FIRST_FORM), 'firstForm',
    getFormCookies(SECOND_FORM), 'secondForm',
    getFormCookies(THIRD_FORM), 'thirdForm',
    getFormCookies(FOURTH_FORM), 'fourthForm',
    getFormCookies(FIFTH_FORM), 'fifthForm',
    getFormCookies(SIXTH_FORM), 'sixthForm',
    getFormCookies(SEVENTH_FORM), 'seventhForm',
    getFormCookies(EIGTH_FORM), 'eightForm',
    getFormCookies(NINETH_FORM), 'ninthForm',
    getFormCookies(TENTH_FORM), 'tenthForm',
    getFormCookies(ELEVENTH_STEP), 'elevenForm',
    getFormCookies(THIRTINTH_FORM), 'thirtinthForm',
  )

  let firstForm: { question: string; step: number; identity: string } =
    getFormCookies(FIRST_FORM);

  let secondForm: {
    question: string;
    step: number;
    description: string;
    organizationType: string[];
    organizationTypeFreeField: string;
  } = (reportingPerson == 'myself' || reportingPerson == 'andere') ?
      getFormCookies(SEVENTH_FORM) : getFormCookies(SEVENTH_FORM)

  // getFormCookies(SIXTH_FORM);
  // getFormCookies(SECOND_FORM);


  let secondFormOrganization: {
    question: string;
    step: number;
    description: string;
    organizationType: string[];
    organizationTypeFreeField: string;
  } = getFormCookies(THIRD_FORM);

  let thirdForm: {
    question: string;
    step: number | any;
    valueDate: string;
    dateRangeState: string;
    datePeriod: boolean;
    numberOfEmployees: string;
  } = (reportingPerson === 'myself')
      ? getFormCookies(FOURTH_FORM)
      : reportingPerson === 'organization' ? getFormCookies(FIFTH_FORM) : getFormCookies(THIRD_FORM);


  // getFormCookies(THIRD_FORM);


  // let thirdFormOrganization: {
  //   question: string;
  //   step: number;
  //   valueDate: string;
  //   dateRangeState: string;
  //   datePeriod: boolean;
  //   numberOfEmployees: string;
  // } = getFormCookies(THIRD_FORM);

  let thirdFormOrganization: {
    step: number;
    numberOfEmployees: string;
    question: string;
  } = getFormCookies(FOURTH_FORM);

  let fourthForm: {
    question: string;
    step: number;
    location: string;
    locationOnline: string;
    stadtteil: string;
  } = reportingPerson === 'myself' ? getFormCookies(FIFTH_FORM) : reportingPerson == 'andere' ? getFormCookies(FIFTH_FORM) : getFormCookies(SIXTH_FORM)

  // getFormCookies(FOURTH_FORM);


  let fifthForm: {
    question: string;
    step: number;
    formOfQueerphobia: any;
    otherformOfQueerphobiaFreeField: string;
  } = (reportingPerson === 'myself' || reportingPerson === 'andere') ? getFormCookies(NINETH_FORM) :
      getFormCookies(EIGTH_FORM)

  // getFormCookies(SIXTH_FORM);

  let thirtinthStep: {
    question: string;
    step: number;
    disciminationArea: any;
    otherformOfDiscriminationAreaFreeField: string;
  } = getFormCookies(SIXTH_FORM);

  let sixthForm: {
    question: string;
    step: number;
    typeOfDiscriminationFreeField: string;
    typeOfDiscrimination: string[];
  } = getFormCookies(EIGTH_FORM)
  // getFormCookies(FIFTH_FORM);

  let seventhForm: {
    question: string;
    step: number;
    formOfDisc: string;
    formOfDiscYes: string[];
    formOfDiscYesFreeField: string;
  } = (reportingPerson === 'myself') ? getFormCookies(TENTH_FORM) : reportingPerson === 'organization' ? getFormCookies(NINETH_FORM) : getFormCookies(NINETH_FORM)
  // getFormCookies(SEVENTH_FORM);

  let eighthForm: {
    question: string;
    step: number;
    haveYouReported: string | any;
    haveYouReportedYes: string[];
    haveYouReportedYesFreeField1: string;
    haveYouReportedYesFreeField2: string;
  } = (reportingPerson == 'myself') ?
      getFormCookies(ELEVENTH_STEP) : reportingPerson == 'andere' ? getFormCookies(TENTH_FORM) : getFormCookies(TENTH_FORM)

  // getFormCookies(EIGTH_FORM);

  let ninethForm: {
    question1: string;
    question2: string;
    question3: string;
    gender: string[];
    genderFreeField: string;
    age: string;
    sexualOrientation: string[];
    sexualOrientationFreeField: string;
    step: number;
  } = getFormCookies(THIRD_FORM)

  // if (
  //   firstForm.identity ===
  //   secondStepTranslation?.options[secondStepTranslation.options.length - 1]
  //     .value
  // ) {
  //   thirdForm = getFormCookies(FIFTH_FORM);
  //   fourthForm = getFormCookies(SIXTH_FORM);
  //   fifthForm = getFormCookies(SEVENTH_FORM);
  //   seventhForm = getFormCookies(EIGTH_FORM)
  //   eighthForm = getFormCookies(NINETH_FORM)
  //   secondForm = getFormCookies(FOURTH_FORM)
  // }

  // Listening to fields

  let validation: string[] = watch('validation');
  let captcha: string = watch('captcha')

  const handleCaptcha = async () => {
    // Captcha verification
    // if the component is not mounted yet
    if (!executeRecaptcha) {
      return;
    }
    // receive a token

    try {
      const token = await executeRecaptcha('onSubmit');

      // validate the token via the server action we've created previously

      const verified = await verifyCaptchaAction(token);

      verified && setVerified(verified);

      setCaptchaLoading(false);
    } catch (error) {
      console.log(error);
      setCaptchaLoading(false);
    }
  };

  captcha && handleCaptcha();

  const onSubmit: SubmitHandler<any> = async () => {
    // Getting values to be sent
    // let firstForm: { identity: string } = getFormCookies(FIRST_FORM);

    // let secondForm: {
    //   description: string;
    //   organizationType: string[];
    //   organizationTypeFreeField: string;
    // } = getFormCookies(SECOND_FORM);

    // let secondFormOrganization: {
    //   description: string;
    //   organizationType: string[];
    //   organizationTypeFreeField: string;
    // } = getFormCookies(SECOND_FORM);

    // let thirdForm: {
    //   step:number;
    //   valueDate: string;
    //   dateRangeState: string;
    //   datePeriod: boolean;
    //   numberOfEmployees: string;
    // } = (reportingPerson == 'myself' || reportingPerson == 'andere') ?
    // getFormCookies(SEVENTH_FORM) : getFormCookies(FOURTH_FORM)

    // // getFormCookies(THIRD_FORM);


    // let thirdFormOrganization: {
    //   valueDate: string;
    //   dateRangeState: string;
    //   datePeriod: boolean;
    //   numberOfEmployees: string;
    // } = getFormCookies(THIRD_FORM);

    // let fourthForm: {
    //   location: string;
    //   locationOnline: string;
    //   stadtteil: string;
    // } = getFormCookies(FOURTH_FORM);

    // let fifthForm: {
    //   formOfQueerphobia: string[];
    //   otherformOfQueerphobiaFreeField: string;
    // } = getFormCookies(SIXTH_FORM);

    // let thirtinthStep: {
    //   question: string;
    //   step: number;
    //   disciminationArea: any;
    //   otherformOfDiscriminationAreaFreeField: string;
    // } = getFormCookies(SIXTH_FORM)

    // let sixthForm: {
    //   typeOfDiscriminationFreeField: string;
    //   typeOfDiscrimination: string[];
    // } = getFormCookies(FIFTH_FORM);

    // let seventhForm: {
    //   formOfDisc: string;
    //   formOfDiscYes: string[];
    //   formOfDiscYesFreeField: string;
    // } = getFormCookies(SIXTH_FORM);

    // let eighthForm: {
    //   haveYouReported: string;
    //   haveYouReportedYes: string[];
    //   haveYouReportedYesFreeField1: string;
    //   haveYouReportedYesFreeField2: string;
    // } = getFormCookies(EIGTH_FORM);

    // // n

    // let ninethForm: {
    //   gender: string[];
    //   genderFreeField: string;
    //   age: string;
    //   sexualOrientation: string[];
    //   sexualOrientationFreeField: string;
    // } = getFormCookies(NINETH_FORM);
    // if (
    //   firstForm.identity ===
    //   secondStepTranslation?.options[secondStepTranslation.options.length - 1]
    //     .value
    // ) {

    //   thirdForm = getFormCookies(FIFTH_FORM);
    //   fourthForm = getFormCookies(SIXTH_FORM);
    //   fifthForm = getFormCookies(SEVENTH_FORM);
    //   seventhForm = getFormCookies(EIGTH_FORM);
    //   eighthForm = getFormCookies(NINETH_FORM);
    //   secondForm = getFormCookies(FOURTH_FORM);
    // }


    let firstForm: { question: string; step: number; identity: string } =
      getFormCookies(FIRST_FORM);

    let secondForm: {
      question: string;
      step: number;
      description: string;
      organizationType: string[];
      organizationTypeFreeField: string;
    } = (reportingPerson == 'myself' || reportingPerson == 'andere') ?
        getFormCookies(SEVENTH_FORM) : getFormCookies(FOURTH_FORM)


    let secondFormOrganization: {
      question: string;
      step: number;
      description: string;
      organizationType: string[];
      organizationTypeFreeField: string;
    } = getFormCookies(THIRD_FORM);

    let thirdForm: {
      question: string;
      step: number | any;
      valueDate: string;
      dateRangeState: string;
      datePeriod: boolean;
      numberOfEmployees: string;
    } = (reportingPerson === 'myself')
        ? getFormCookies(FOURTH_FORM)
        : reportingPerson === 'organization' ? getFormCookies(FIFTH_FORM) : getFormCookies(THIRD_FORM);

    let thirdFormOrganization: {
      step: number;
      numberOfEmployees: string;
      question: string;
    } = getFormCookies(FOURTH_FORM);

    let fourthForm: {
      question: string;
      step: number;
      location: string;
      locationOnline: string;
      stadtteil: string;
    } = reportingPerson === 'myself' ? getFormCookies(FIFTH_FORM) : reportingPerson == 'andere' ? getFormCookies(FIFTH_FORM) : getFormCookies(SIXTH_FORM)

    let fifthForm: {
      question: string;
      step: number;
      formOfQueerphobia: any;
      otherformOfQueerphobiaFreeField: string;
    } = (reportingPerson === 'myself' || reportingPerson === 'andere') ? getFormCookies(NINETH_FORM) :
        getFormCookies(EIGTH_FORM)

    let thirtinthStep: {
      question: string;
      step: number;
      disciminationArea: any;
      otherformOfDiscriminationAreaFreeField: string;
    } = getFormCookies(SIXTH_FORM);

    let sixthForm: {
      question: string;
      step: number;
      typeOfDiscriminationFreeField: string;
      typeOfDiscrimination: string[];
    } = getFormCookies(EIGTH_FORM)

    let seventhForm: {
      question: string;
      step: number;
      formOfDisc: string;
      formOfDiscYes: string[];
      formOfDiscYesFreeField: string;
    } = (reportingPerson === 'myself') ? getFormCookies(TENTH_FORM) : reportingPerson === 'organization' ? getFormCookies(NINETH_FORM) : getFormCookies(NINETH_FORM)

    let eighthForm: {
      question: string;
      step: number;
      haveYouReported: string | any;
      haveYouReportedYes: string[];
      haveYouReportedYesFreeField1: string;
      haveYouReportedYesFreeField2: string;
    } = (reportingPerson == 'myself') ?
        getFormCookies(ELEVENTH_STEP) : reportingPerson == 'andere' ? getFormCookies(TENTH_FORM) : getFormCookies(TENTH_FORM)

    let ninethForm: {
      question1: string;
      question2: string;
      question3: string;
      gender: string[];
      genderFreeField: string;
      age: string;
      sexualOrientation: string[];
      sexualOrientationFreeField: string;
      step: number;
    } = getFormCookies(THIRD_FORM)

    // Getting exact values

    let identity = firstForm?.identity;
    let description = secondForm?.description;
    let organizationType = secondFormOrganization?.organizationType;
    let organizationTypeFreeField = secondFormOrganization?.organizationTypeFreeField;
    let numberOfEmployees = thirdFormOrganization?.numberOfEmployees;
    let valueDate: string = thirdForm?.valueDate;
    let dateRangeState: string =
      (thirdForm?.dateRangeState && thirdForm?.dateRangeState.toString()) || '';
    let datePeriod =
      (thirdForm?.datePeriod && thirdForm?.datePeriod.toString()) || '';
    let location = fourthForm?.location;
    let stadtteil = fourthForm?.stadtteil;
    let locationOnline = fourthForm?.locationOnline;
    let formOfQueerphobia = fifthForm?.formOfQueerphobia;
    let otherformOfQueerphobiaFreeField =
      fifthForm?.otherformOfQueerphobiaFreeField;
    let disciminationArea = thirtinthStep?.disciminationArea;
    let otherformOfDiscriminationAreaFreeField = thirtinthStep?.otherformOfDiscriminationAreaFreeField;
    let typeOfDiscriminationFreeField =
      sixthForm?.typeOfDiscriminationFreeField;
    let typeOfDiscrimination = sixthForm?.typeOfDiscrimination;
    let formOfDisc = seventhForm?.formOfDisc;
    let formOfDiscYes = seventhForm?.formOfDiscYes;
    let formOfDiscYesFreeField = seventhForm?.formOfDiscYesFreeField;

    let haveYouReported = eighthForm?.haveYouReported;
    let haveYouReportedYes = eighthForm?.haveYouReportedYes;
    let haveYouReportedYesFreeField1 = eighthForm?.haveYouReportedYesFreeField1;
    let haveYouReportedYesFreeField2 = eighthForm?.haveYouReportedYesFreeField2;

    let gender = ninethForm?.gender;
    let genderFreeField = ninethForm?.genderFreeField;
    let age = ninethForm?.age;
    let sexualOrientation = ninethForm?.sexualOrientation;
    let sexualOrientationFreeField = ninethForm?.sexualOrientationFreeField;

    const report = {
      identity,
      description,
      organizationType,
      organizationTypeFreeField,
      numberOfEmployees,
      valueDate,
      dateRangeState,
      datePeriod,
      location,
      stadtteil,
      locationOnline,
      formOfQueerphobia,
      otherformOfQueerphobiaFreeField,
      typeOfDiscrimination,
      typeOfDiscriminationFreeField,
      formOfDisc,
      formOfDiscYes,
      formOfDiscYesFreeField,
      haveYouReported,
      haveYouReportedYes,
      haveYouReportedYesFreeField1,
      haveYouReportedYesFreeField2,
      gender,
      genderFreeField,
      age,
      sexualOrientation,
      sexualOrientationFreeField,
      disciminationArea,
      otherformOfDiscriminationAreaFreeField
    };

    console.log('report', report);


    try {
      dispatch({ type: FORM_ERRORS, payload: true });
      //  if (verified) {
      // Here you would send the input data to a database, and
      // reset the form UI, display success message logic etc.
      // Sending data to API
      // console.log('report', report);
      const response = await new ReportService().sendReport(report).then((result) => {
        if (result.status === 201 || result.status === 200) {
          clearFormCookies();
          setIsModalOpen(true)
          console.log('Successfull');
          dispatch({ type: FORM_ERRORS, payload: false });
          // dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
        } else {
          console.log('failed');
          setCaptchaLoading(false);
          dispatch({ type: FORM_ERRORS, payload: false });
          throw new Error('Fetching error occured, please reload');
        }
      }).catch((error) => {
        console.log("error")
        setCaptchaLoading(false);
        console.log('verify error captcha2', error);
        dispatch({ type: FORM_ERRORS, payload: false });
        throw new Error('Fetching error occured, please reload');
      }
      );

      //  }
    } catch (error) {
      dispatch({ type: FORM_ERRORS, payload: false });

      console.log('verify error captcha', error);
      setCaptchaLoading(false);
    }

    // End captcha verification
  };

  // console.log(submitCheck, 'submitCheck')

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (captcha && captcha.length > 0 && captcha.includes('captcha')) {
      dispatch({ type: FORM_ERRORS, payload: false })
    }
    if (!captcha) {
      dispatch({ type: FORM_ERRORS, payload: true });
    }



    // if (isValid===false) {
    //   dispatch({ type: FORM_ERRORS, payload: true });
    // }else{
    //   dispatch({ type: FORM_ERRORS, payload: false });
    // }
    // !verified
    //   ? dispatch({ type: FORM_ERRORS, payload: true })
    //   : dispatch({ type: FORM_ERRORS, payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified, captcha, isValid]);

  return (
    <div>
      {submitPage && <div>
        <div className="">
          <div className='pl-10 mb-5'>
            <h1 className='text-4xl font-black'>Einwilligung*</h1>
            <b>*Pflichtfeld</b>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} id="tenthForm">
              <div>
                <SubmitModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  Modaldes={'Submission Successful'}
                  // modalBtn={'none'}
                >
                  <TwelvethStepComponent />
                </SubmitModal>
              </div>
              {eleventhStepTranslation?.validation?.data?.map((element: any) => (
                <Checkbox
                  key={element?.id}
                  id={element?.id}
                  name={element?.name}
                  props={register('validation')}
                  value={element?.value}
                  label={element?.label}
                />
              ))}
            </form>
          </div>

          <div
            ref={container}
            // className="frc-captcha"
            data-sitekey="YOUR_SITE_KEY"
          />
        </div>
        {/* Captcha check */}
        {validation &&
          validation?.includes(
            eleventhStepTranslation?.validation?.data[0]?.value
          ) && (
            <div className="w-full border mt-2">
              <CaptchaCheckbox
                id="captcha"
                loading={captchLoading}
                // checked={captcha ? true : false}
                name="captcha"
                props={register('captcha', { required: true })}
                value="captcha"
                label={eleventhStepTranslation?.captcha}
              />
            </div>
          )}
        <div className='mt-[114px]'>
          <AnimateClick >
            <Button
              form={`${'tenthForm'}`}
              //   onClick={onClose}
              type='submit'
              disabled={formErrors && true}
              variant={`${formErrors ? 'disabled' : 'primary'}`}
              className="font-bold w-fit rounded-full mb-6"
            >
              {/* {modalBtn} */}
              Meldung abschicken
            </Button>
          </AnimateClick>
        </div>
      </div>}
      {/* </SubmitModal> */}

      {!submitPage && <div>
        <h1 className="font-bold text-2xl mb-4">
          {eleventhStepTranslation?.verification}
        </h1>
        <EditBlock
          step={firstForm?.step}
          question={firstForm?.question}
          answer={firstForm?.identity}
        />

        {reportingPerson === 'organization'
          // secondStepTranslation?.options[
          //   secondStepTranslation.options.length - 1
          // ].value 
          &&
          // secondFormOrganization &&
          // secondFormOrganization?.organizationType && 
          (
            <EditBlock
              step={secondFormOrganization.step}
              question={secondFormOrganization?.question}
              answer={[
                secondFormOrganization?.description,
                ...secondFormOrganization?.organizationType,
                secondFormOrganization?.organizationTypeFreeField,
              ]}
            />
          )}

        {thirdFormOrganization?.numberOfEmployees && (
          <EditBlock
            step={thirdFormOrganization.step}
            question={thirdFormOrganization?.question}
            answer={thirdFormOrganization?.numberOfEmployees}
          />
        )}

        {/* When Nein is chosen don't display */}

        {reportingPerson !== 'organization' && seventhForm &&
          seventhForm?.formOfDiscYes &&
          seventhForm?.formOfDisc.length < 6 && (
            <EditBlock
              step={seventhForm?.step}
              question={seventhForm?.question}
              answer={[seventhForm?.formOfDisc]}
            />
          )}

        {/* {eighthForm &&
          eighthForm?.haveYouReportedYes &&
          eighthForm?.haveYouReported !== 'Nein' &&
          eighthForm?.haveYouReported !== 'No' && (
            <EditBlock
              step={eighthForm?.step}
              question={eighthForm?.question}
              answer={[
                ...eighthForm?.haveYouReportedYes,
                eighthForm?.haveYouReportedYesFreeField1,
                eighthForm?.haveYouReportedYesFreeField2,
              ]}
            />
          )} */}

        {/* When Nein is chosen don't display */}
        {reportingPerson !== 'organization'
          // secondStepTranslation?.options[
          //   secondStepTranslation.options.length - 1
          // ].value 

          && (
            <>
              {ninethForm && ninethForm?.gender && (
                <EditBlock
                  step={ninethForm?.step}
                  question={ninethForm?.question1}
                  answer={[...ninethForm?.gender, ninethForm?.genderFreeField]}
                />
              )}
              {ninethForm && ninethForm?.sexualOrientation && (
                <EditBlock
                  step={ninethForm?.step}
                  question={ninethForm?.question2}
                  answer={[
                    ...ninethForm?.sexualOrientation,
                    ninethForm?.sexualOrientationFreeField,
                  ]}
                />
              )}

              {ninethForm && (
                <EditBlock
                  step={ninethForm?.step}
                  question={ninethForm?.question3}
                  answer={ninethForm?.age}
                />
              )}
            </>
          )}


        {thirdForm && (
          <EditBlock
            step={thirdForm.step}
            question={thirdForm?.question}
            answer={[
              thirdForm?.datePeriod
                ? thirdForm?.dateRangeState
                : dayjs(thirdForm?.valueDate).format(
                  'DD.MM.YYYY T HH:mm:ssZ[Z]'
                ),
              thirdForm?.numberOfEmployees,
            ]}
          />
        )}

        <EditBlock
          step={fourthForm?.step}
          question={fourthForm?.question}
          answer={[
            fourthForm?.location,
            fourthForm?.location ? '' : fourthForm?.locationOnline,
            fourthForm?.stadtteil && fourthForm.stadtteil,
          ]}
        />

        {thirtinthStep && thirtinthStep?.disciminationArea && (
          <EditBlock
            step={thirtinthStep?.step}
            question={thirtinthStep?.question}
            answer={[
              ...thirtinthStep?.disciminationArea,
              thirtinthStep?.otherformOfDiscriminationAreaFreeField,
            ]}
          />
        )}


        {secondForm?.description && (
          <EditBlock
            step={secondForm.step}
            question={secondForm?.question}
            answer={[secondForm?.description]}
          />
        )}

        {sixthForm && sixthForm?.typeOfDiscrimination && (
          <EditBlock
            step={sixthForm?.step}
            question={sixthForm?.question}
            answer={[
              ...sixthForm?.typeOfDiscrimination,
              sixthForm?.typeOfDiscriminationFreeField,
            ]}
          />
        )}

        {fifthForm && fifthForm?.formOfQueerphobia && (
          <EditBlock
            step={fifthForm?.step}
            question={fifthForm?.question}
            answer={[
              ...fifthForm?.formOfQueerphobia,
              fifthForm?.otherformOfQueerphobiaFreeField,
            ]}
          />
        )}

        {seventhForm &&
          seventhForm?.formOfDiscYes &&
          seventhForm?.formOfDisc.length >= 6 && (
            <>
              <EditBlock
                step={seventhForm?.step}
                question={seventhForm?.question}
                answer={[
                  seventhForm?.formOfDisc,
                  ...seventhForm?.formOfDiscYes,

                  seventhForm?.formOfDiscYesFreeField,
                ]}
              />
            </>
          )}

        {reportingPerson === 'organization' &&
          seventhForm &&
          seventhForm?.formOfDiscYes &&
          seventhForm?.formOfDisc.length < 6 && (
            <EditBlock
              step={seventhForm?.step}
              question={seventhForm?.question}
              answer={[seventhForm?.formOfDisc]}
            />
          )
        }


        {eighthForm && eighthForm?.haveYouReported &&
          eighthForm?.haveYouReported &&
          eighthForm?.haveYouReported &&
          (
            <EditBlock
              step={eighthForm?.step}
              question={eighthForm?.question}
              answer={[
                ...eighthForm?.haveYouReportedYes,
                eighthForm?.haveYouReportedYesFreeField1,
                eighthForm?.haveYouReportedYesFreeField2,
              ]}
            />
          )}


      </div>}

    </div>
  );
};

export default EleventhStep;
