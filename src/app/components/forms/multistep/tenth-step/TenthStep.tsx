import React, { useCallback, useEffect, useState } from 'react';
import { TenthFormValues, TenthStepProps } from './tenthStep';
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
  SECOND_FORM,
  SEVENTH_FORM,
  SIXTH_FORM,
  THIRD_FORM,
} from '@/cookies/cookies.d';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import ReportService from '@/services/reportService';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const TenthStep: React.FC<TenthStepProps> = ({ tenthStepTranslation }) => {
  // Scroll on top
  useScrollOnTop();
  const { dispatch, reportingPerson } = useFormContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TenthFormValues>();

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
    question1: string;
    question2: string;
    question3: string;
    gender: string[];
    genderFreeField: string;
    age: string;
    sexualOrientation: string[];
    sexualOrientationFreeField: string;
    step: number;
  } = getFormCookies(EIGTH_FORM);

  let validation = watch('validation');

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
      gender: string[];
      genderFreeField: string;
      age: string;
      sexualOrientation: string[];
      sexualOrientationFreeField: string;
    } = getFormCookies(EIGTH_FORM);

    // Getting exact values

    let identity = firstForm?.identity;
    let description = secondForm?.description;
    let organizationType = secondForm?.organizationType;
    let organizationTypeFreeField = secondForm?.organizationTypeFreeField;
    let numberOfEmployees = thirdForm?.numberOfEmployees;
    let valueDate = thirdForm?.valueDate;
    let dateRangeState = thirdForm?.dateRangeState.toString();
    let datePeriod = thirdForm?.datePeriod.toString();
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
    let gender = eighthForm?.gender;
    let genderFreeField = eighthForm?.genderFreeField;
    let age = eighthForm?.age;
    let sexualOrientation = eighthForm?.sexualOrientation;
    let sexualOrientationFreeField = eighthForm?.sexualOrientationFreeField;

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
    validation?.length === 0
      ? dispatch({ type: FORM_ERRORS, payload: true })
      : dispatch({ type: FORM_ERRORS, payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="eighthForm">
      <h1 className="font-bold text-2xl mb-4">
        {tenthStepTranslation?.verification}
      </h1>
      <div>
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
                : thirdForm?.valueDate,
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
        {reportingPerson !== 'organization' && (
          <>
            {eighthForm && eighthForm?.gender && (
              <EditBlock
                step={eighthForm?.step}
                question={eighthForm?.question1}
                answer={[...eighthForm?.gender, eighthForm?.genderFreeField]}
              />
            )}
            {eighthForm && eighthForm?.sexualOrientation && (
              <EditBlock
                step={eighthForm?.step}
                question={eighthForm?.question2}
                answer={[
                  ...eighthForm?.sexualOrientation,
                  eighthForm?.sexualOrientationFreeField,
                ]}
              />
            )}

            {eighthForm && (
              <EditBlock
                step={eighthForm?.step}
                question={eighthForm?.question3}
                answer={eighthForm?.age}
              />
            )}
          </>
        )}
      </div>
      <div className="mt-8">
        <FormHeader title={tenthStepTranslation?.validation?.title} />
        <div className="-mt-8">
          {tenthStepTranslation?.validation?.data?.map((element: any) => (
            <Checkbox
              key={element?.iD}
              id={element?.id}
              name={element?.name}
              props={register('validation')}
              value={element?.value}
              label={element?.label}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default TenthStep;
