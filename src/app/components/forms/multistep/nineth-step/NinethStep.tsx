import React, { useCallback, useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { NinethStepProps, NinethFormValues } from './ninethStep.d';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { EIGTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const NinethStep: React.FC<NinethStepProps> = ({ ninethStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question1] = useState<string>(
    ninethStepTranslation?.firstBlock?.title
  );
  const [question2] = useState<string>(
    ninethStepTranslation?.secondBlock?.title
  );
  const [question3] = useState<string>(
    ninethStepTranslation?.thirdBlock?.title
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NinethFormValues>();

  let gender: string[] = watch('gender');
  let sexualOrientation: string[] = watch('sexualOrientation');
  let validation = watch('validation');
  let sexualOrientationFreeField: string[] = watch(
    'sexualOrientationFreeField'
  );
  let age: string = watch('age');
  let genderFreeField: string = watch('genderFreeField');

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // Getting values from cookies
    let formValues: {
      gender: string[];
      sexualOrientation: string[];
      validation: string;
      question: string;
      sexualOrientationFreeField: string[];
      age: string;
      genderFreeField: string;
    } = getFormCookies(EIGTH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });

    if (validation?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    // first form validation
    {
      gender &&
        gender?.includes('Selbstbezeichung:') &&
        genderFreeField?.length <= 3 &&
        dispatch({ type: FORM_ERRORS, payload: true });
    }

    // second form validation.
    {
      sexualOrientation &&
        sexualOrientation?.includes('Selbstbezeichung:') &&
        sexualOrientationFreeField?.length <= 3 &&
        dispatch({ type: FORM_ERRORS, payload: true });
    }

    // Setting default values if the data are available in cookies
    if (formValues) {
      dispatch({ type: FORM_ERRORS, payload: false });
      gender !== formValues?.gender && setValue('gender', formValues?.gender);
      sexualOrientation !== formValues?.sexualOrientation &&
        setValue('sexualOrientation', formValues?.sexualOrientation);
      validation !== formValues?.validation &&
        setValue('validation', formValues?.validation);
      sexualOrientationFreeField !== formValues?.sexualOrientationFreeField &&
        setValue(
          'sexualOrientationFreeField',
          formValues?.sexualOrientationFreeField
        );
      age !== formValues?.age && setValue('age', formValues?.age);
      genderFreeField !== formValues?.genderFreeField &&
        setValue('genderFreeField', formValues?.genderFreeField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, genderFreeField, sexualOrientationFreeField, sexualOrientation]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<NinethFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question1, question2, question3, step, ...data };
    setFormCookies(dataWithQuestion, EIGTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="eighthForm"
      className="lg:w-[35rem]"
    >
      {reportingPerson !== 'organization' && (
        <>
          <h1 className="font-bold text-3xl mb-4">
            {ninethStepTranslation?.mainTitle}
          </h1>
          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.firstBlock?.titleOnBehalf
                  : ninethStepTranslation?.firstBlock?.title
              }
              subTitle={ninethStepTranslation?.firstBlock?.description}
            />
            <div className="-mt-8">
              {ninethStepTranslation?.firstBlock?.data?.map((element: any) => (
                <Checkbox
                  key={element?.iD}
                  id={element?.id}
                  name={element?.name}
                  props={register('gender')}
                  value={element?.value}
                  label={element?.label}
                />
              ))}
              <div className="ml-4">
                {gender && gender?.includes('Selbstbezeichung:') && (
                  <InputField name="" props={register('genderFreeField')} />
                )}
                {gender?.length > 0 &&
                  gender?.includes('Selbstbezeichung:') &&
                  genderFreeField?.length !== 0 &&
                  formErrors && (
                    <label className="text-red-500 text-xs">
                      A minimum of 4 Characters is expected
                    </label>
                  )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.secondBlock?.titleOnBehalf
                  : ninethStepTranslation?.secondBlock?.title
              }
              subTitle={ninethStepTranslation?.secondBlock?.description}
            />
            <div className="-mt-8">
              {ninethStepTranslation?.secondBlock?.data?.map((element: any) => (
                <Checkbox
                  key={element?.iD}
                  id={element?.id}
                  name={element?.name}
                  props={register('sexualOrientation')}
                  value={element?.value}
                  label={element?.label}
                />
              ))}

              <div className="ml-4">
                {sexualOrientation &&
                  sexualOrientation?.includes('Selbstbezeichung:') && (
                    <InputField
                      name=""
                      props={register('sexualOrientationFreeField')}
                    />
                  )}
                {sexualOrientation?.length > 0 &&
                  sexualOrientation?.includes('Selbstbezeichung:') &&
                  sexualOrientationFreeField?.length !== 0 &&
                  formErrors && (
                    <label className="text-red-500 text-xs">
                      A minimum of 4 Characters is expected
                    </label>
                  )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.thirdBlock?.titleOnBehalf
                  : ninethStepTranslation?.thirdBlock?.title
              }
            />
            <div className="-mt-8">
              {
                <RadioGroup
                  options={ninethStepTranslation?.thirdBlock?.data}
                  props={register('age')}
                  title=""
                />
              }
            </div>
          </div>
        </>
      )}

      {reportingPerson === 'organization' && (
        <div className="mt-8">
          <FormHeader title={ninethStepTranslation?.fourthBlock?.title} />
          <div className="-mt-8">
            {ninethStepTranslation?.fourthBlock?.data?.map((element: any) => (
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
      )}
    </form>
  );
};

export default NinethStep;
