import React, { useCallback, useEffect, useState } from 'react';
import { EleventhFormValues, EleventhStepProps } from './eleventhStep';
import { useFormContext } from '@/app/hooks/useFormContext';
import { clearFormCookies, getFormCookies } from '@/cookies/cookies';
import FormHeader from '../header/header';
import Checkbox from '../../checkbox/Checkbox';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditBlock from './EditBlock';
import {
  EIGTH_FORM,
  FIFTH_FORM,
  FIRST_FORM,
  FOURTH_FORM,
  NINETH_FORM,
  SECOND_FORM,
  SEVENTH_FORM,
  SIXTH_FORM,
  THIRD_FORM,
} from '@/cookies/cookies.d';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import ReportService from '@/services/reportService';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import dayjs from 'dayjs';

const EleventhStep: React.FC<EleventhStepProps> = ({
  eleventhStepTranslation,
}) => {
  // Scroll on top
  useScrollOnTop();
  const { dispatch, reportingPerson } = useFormContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EleventhFormValues>();

  let firstForm: { question: string; step: number; identity: string } =
    getFormCookies(FIRST_FORM);
  let secondForm: {
    question: string;
    step: number;
    description: string;
    organizationType: string[];
    organizationTypeFreeField: string;
  } = getFormCookies(SECOND_FORM);
  let thirdForm: {
    question: string;
    step: number;
    valueDate: string;
    dateRangeState: string;
    datePeriod: boolean;
    numberOfEmployees: string;
  } = getFormCookies(THIRD_FORM);
  let fourthForm: {
    question: string;
    step: number;
    location: string;
    locationOnline: string;
  } = getFormCookies(FOURTH_FORM);

  let fifthForm: {
    question: string;
    step: number;
    formOfQueerphobia: any;
    otherformOfQueerphobiaFreeField: string;
  } = getFormCookies(FIFTH_FORM);
  let sixthForm: {
    question: string;
    step: number;
    typeOfDiscriminationFreeField: string;
    typeOfDiscrimination: string[];
  } = getFormCookies(SIXTH_FORM);

  let seventhForm: {
    question: string;
    step: number;
    formOfDisc: string;
    formOfDiscYes: string[];
    formOfDiscYesFreeField: string;
  } = getFormCookies(SEVENTH_FORM);

  let eighthForm: {
    question: string;
    step: number;
    haveYouReported: string;
    haveYouReportedYes: string[];
    haveYouReportedYesFreeField1: string;
    haveYouReportedYesFreeField2: string;
  } = getFormCookies(EIGTH_FORM);

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
  } = getFormCookies(NINETH_FORM);

  let validation: string[] = watch('validation');

  const onSubmit: SubmitHandler<any> = async () => {
    // Getting values to be sent
    let firstForm: { identity: string } = getFormCookies(FIRST_FORM);

    let secondForm: {
      description: string;
      organizationType: string[];
      organizationTypeFreeField: string;
    } = getFormCookies(SECOND_FORM);

    let thirdForm: {
      valueDate: string;
      dateRangeState: string;
      datePeriod: boolean;
      numberOfEmployees: string;
    } = getFormCookies(THIRD_FORM);

    let fourthForm: {
      location: string;
      locationOnline: string;
    } = getFormCookies(FOURTH_FORM);

    let fifthForm: {
      formOfQueerphobia: string[];
      otherformOfQueerphobiaFreeField: string;
    } = getFormCookies(FIFTH_FORM);

    let sixthForm: {
      typeOfDiscriminationFreeField: string;
      typeOfDiscrimination: string[];
    } = getFormCookies(SIXTH_FORM);

    let seventhForm: {
      formOfDisc: string;
      formOfDiscYes: string[];
      formOfDiscYesFreeField: string;
    } = getFormCookies(SEVENTH_FORM);

    let eighthForm: {
      haveYouReported: string;
      haveYouReportedYes: string[];
      haveYouReportedYesFreeField1: string;
      haveYouReportedYesFreeField2: string;
    } = getFormCookies(EIGTH_FORM);

    // n

    let ninethForm: {
      gender: string[];
      genderFreeField: string;
      age: string;
      sexualOrientation: string[];
      sexualOrientationFreeField: string;
    } = getFormCookies(NINETH_FORM);

    // Getting exact values

    let identity = firstForm?.identity;
    let description = secondForm?.description;
    let organizationType = secondForm?.organizationType;
    let organizationTypeFreeField = secondForm?.organizationTypeFreeField;
    let numberOfEmployees = thirdForm?.numberOfEmployees;
    let valueDate: string = thirdForm?.valueDate;
    let dateRangeState: string =
      (thirdForm?.dateRangeState && thirdForm?.dateRangeState.toString()) || '';
    let datePeriod =
      (thirdForm?.datePeriod && thirdForm?.datePeriod.toString()) || '';
    let location = fourthForm?.location;
    let locationOnline = fourthForm?.locationOnline;
    let formOfQueerphobia = fifthForm?.formOfQueerphobia;
    let otherformOfQueerphobiaFreeField =
      fifthForm?.otherformOfQueerphobiaFreeField;
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
    };

    // Sending data to API
    const response = await new ReportService().sendReport(report);

    if (response.status === 201) {
      console.log('Successfull');
    } else {
      throw new Error('Fetching error occured, please reload');
    }

    clearFormCookies();
    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });
    !validation ||
    !validation?.includes(eleventhStepTranslation?.validation?.data[1]?.value)
      ? dispatch({ type: FORM_ERRORS, payload: true })
      : dispatch({ type: FORM_ERRORS, payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation]);

  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl mb-4">
          {eleventhStepTranslation?.verification}
        </h1>
        <EditBlock
          step={firstForm?.step}
          question={firstForm?.question}
          answer={firstForm?.identity}
        />

        {secondForm && secondForm?.organizationType && (
          <EditBlock
            step={secondForm.step}
            question={secondForm?.question}
            answer={[
              secondForm?.description,
              ...secondForm?.organizationType,
              secondForm?.organizationTypeFreeField,
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
          ]}
        />
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

        {seventhForm && seventhForm?.formOfDiscYes && (
          <>
            <EditBlock
              step={seventhForm?.step}
              question={seventhForm?.question}
              answer={[
                ...seventhForm?.formOfDiscYes,
                seventhForm?.formOfDisc,
                seventhForm?.formOfDiscYesFreeField,
              ]}
            />
          </>
        )}

        {/* When Nein is chosen don't display */}

        {seventhForm && seventhForm?.formOfDiscYes && (
          <EditBlock
            step={seventhForm?.step}
            question={seventhForm?.question}
            answer={[
              ...seventhForm?.formOfDiscYes,
              seventhForm?.formOfDisc,
              seventhForm?.formOfDiscYesFreeField,
            ]}
          />
        )}

        {eighthForm && eighthForm?.haveYouReported && (
          <EditBlock
            step={eighthForm?.step}
            question={eighthForm?.question}
            answer={[eighthForm?.haveYouReported]}
          />
        )}

        {eighthForm &&
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
          )}

        {/* When Nein is chosen don't display */}

        {reportingPerson !== 'organization' && (
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
      </div>
      <div className="mt-8">
        <FormHeader title={eleventhStepTranslation?.validation?.title} />
        <div className="-mt-8">
          <form onSubmit={handleSubmit(onSubmit)} id="tenthForm">
            <h1 className="hidden">title</h1>
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
      </div>
    </div>
  );
};

export default EleventhStep;
