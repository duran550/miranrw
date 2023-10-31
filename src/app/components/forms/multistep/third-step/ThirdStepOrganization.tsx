import React, { useEffect, useState } from 'react';
import {
  ThirdStepOrganizationFormValues,
  ThirdStepOrganizationProps,
} from './thirdStepOrganization';
import { useFormContext } from '@/app/hooks/useFormContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import FormHeader from '../header/header';
import Checkbox from '../../checkbox/Checkbox';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SECOND_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const ThirdStepOrganization: React.FC<ThirdStepOrganizationProps> = ({
  thirdStepOrganizationTranslation,
}) => {
  const { dispatch, isEditing, reportingPerson } = useFormContext();
  const [question] = useState<string>(thirdStepOrganizationTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ThirdStepOrganizationFormValues>();

  let organizationType: string[] = watch('organizationType');

  // Getting form cookies
  let formValues: {
    organizationType: string[];
    organizationTypeFreeField: string;
    question: string;
  } = getFormCookies(SECOND_FORM);

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (organizationType?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // Setting default values if exists in cookies

    if (formValues && !organizationType) {
      organizationType !== formValues?.organizationType &&
        setValue('organizationType', formValues?.organizationType);
      organizationType !== formValues?.organizationTypeFreeField &&
        setValue(
          'organizationTypeFreeField',
          formValues?.organizationTypeFreeField
        );
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationType]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<ThirdStepOrganizationFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, SECOND_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <div className="flex flex-col relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="secondForm"
        className="lg:w-[35rem]"
      >
        <FormHeader
          title={thirdStepOrganizationTranslation?.title}
          subTitle={thirdStepOrganizationTranslation?.subTitle}
        />
        <div className="">
          {thirdStepOrganizationTranslation?.data?.map((value: any) => (
            <Checkbox
              key={value?.iD}
              id={value?.id}
              name="organizationType"
              props={register('organizationType')}
              label={value?.label}
              value={value?.value}
            />
          ))}
          <div className="ml-4">
            {organizationType &&
              organizationType?.includes('Anderes, und zwar') && (
                <InputField
                  name="organizationTypeFreeField"
                  props={register('organizationTypeFreeField')}
                />
              )}
          </div>
        </div>
      </form>
      <div className="mt-4 lg:absolute lg:-right-[40rem]"></div>
    </div>
  );
};

export default ThirdStepOrganization;
