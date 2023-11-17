import React, { useEffect, useState } from 'react';
import { FourthStepOrganizationProps } from './fourthStepOrganization';
import FormHeader from '../header/header';
import RadioGroup from '../../radio/RadioGroup';
import { FourthStepOrganizationFormValues } from './fourthStepOrganization';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { THIRD_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const FourthStepOrganization: React.FC<FourthStepOrganizationProps> = ({
  fourthStepOrganizationTranslation,
}) => {
  const [question] = useState<string>(fourthStepOrganizationTranslation?.title);

  const { dispatch, reportingPerson, isEditing } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FourthStepOrganizationFormValues>();

  let numberOfEmployees = watch('numberOfEmployees');
  // Getting form cookies
  let formValues: {
    numberOfEmployees: string;
    question: string;
  } = getFormCookies(THIRD_FORM);

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // dispatch({ type: FORM_ERRORS, payload: true });

    if (numberOfEmployees) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      if (formValues && !numberOfEmployees) {
        numberOfEmployees !== formValues?.numberOfEmployees &&
          setValue('numberOfEmployees', formValues?.numberOfEmployees);

        dispatch({ type: FORM_ERRORS, payload: false });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfEmployees, formValues?.numberOfEmployees]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FourthStepOrganizationFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, THIRD_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 11 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="thirdForm"
      className="flex flex-col relative"
    >
      <div className="lg:w-[35rem]">
        <FormHeader
          title={fourthStepOrganizationTranslation?.title}
          subTitle={fourthStepOrganizationTranslation?.subTitle}
        />
        <div className="">
          <RadioGroup
            options={fourthStepOrganizationTranslation?.data}
            props={register('numberOfEmployees')}
            title=""
          />
        </div>
      </div>
      <div className="mt-4 lg:absolute lg:-right-[40rem]"></div>
    </form>
  );
};

export default FourthStepOrganization;
