import React, { useEffect, useState } from 'react';
import { TenthFormValues, TenthStepProps } from './tenthStep';
import { Button } from '@/app/components/button/Button';
import { useFormContext } from '@/app/hooks/useFormContext';
import { clearFormStep, getFormCookies } from '@/cookies/cookies';
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

type formCookies = {};

const TenthStep: React.FC<TenthStepProps> = ({ tenthStepTranslation }) => {
  const { dispatch, reportingPerson } = useFormContext();
  const [formData, setFormData] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenthFormValues>();

  let firstForm: { question: string; step: number; identity: string } =
    getFormCookies(FIRST_FORM);
  let secondForm: { question: string; step: number; description: string } =
    getFormCookies(SECOND_FORM);
  let thirdForm: {
    question: string;
    step: number;
    valueDate: string;
    dateRange: string;
    datePeriod: boolean;
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
    formOfDiscrimination: string[];
    otherForm: string;
  } = getFormCookies(FIFTH_FORM);
  let sixthForm: {
    question: string;
    step: number;
    otherForm: string;
    typeOfDiscrimination: string[];
  } = getFormCookies(SIXTH_FORM);

  let seventhForm: {
    question: string;
    step: number;
    formOfDisc: string;
    formOfDiscYes: string[];
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
  console.log(eighthForm);
  let ninethForm = getFormCookies(NINETH_FORM);

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Are you okay with this data ?</h1>
      <div>
        <EditBlock
          step={firstForm.step}
          question={firstForm?.question}
          answer={firstForm?.identity}
        />

        <EditBlock
          step={secondForm.step}
          question={secondForm?.question}
          answer={secondForm?.description}
        />
        <EditBlock
          step={thirdForm.step}
          question={thirdForm?.question}
          answer={
            thirdForm?.datePeriod ? thirdForm?.dateRange : thirdForm?.valueDate
          }
        />
        <EditBlock
          step={fourthForm.step}
          question={fourthForm?.question}
          answer={[fourthForm?.location, fourthForm?.locationOnline]}
        />
        <EditBlock
          step={fifthForm?.step}
          question={fifthForm?.question}
          answer={[...fifthForm?.formOfDiscrimination, fifthForm?.otherForm]}
        />
        <EditBlock
          step={sixthForm?.step}
          question={sixthForm?.question}
          answer={[...sixthForm?.typeOfDiscrimination, sixthForm?.otherForm]}
        />
        {seventhForm && seventhForm?.formOfDiscYes && (
          <EditBlock
            step={seventhForm?.step}
            question={seventhForm?.question}
            answer={[...seventhForm?.formOfDiscYes, seventhForm?.formOfDisc]}
          />
        )}
        {reportingPerson !== 'organization' && (
          <>
            <EditBlock
              step={eighthForm?.step}
              question={eighthForm?.question1}
              answer={[...eighthForm?.gender, eighthForm?.genderFreeField]}
            />
            <EditBlock
              step={eighthForm?.step}
              question={eighthForm?.question2}
              answer={[
                ...eighthForm?.sexualOrientation,
                eighthForm?.sexualOrientationFreeField,
              ]}
            />
            <EditBlock
              step={eighthForm?.step}
              question={eighthForm?.question3}
              answer={eighthForm?.age}
            />
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
    </>
  );
};

export default TenthStep;
