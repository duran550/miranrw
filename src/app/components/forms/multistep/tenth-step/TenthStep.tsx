import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { TenthStepProps, TenthFormValues } from './tenthStep';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { NINETH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const TenthStep: React.FC<TenthStepProps> = ({ tenthStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question1] = useState<string>(tenthStepTranslation?.firstBlock?.title);
  const [question2] = useState<string>(
    tenthStepTranslation?.secondBlock?.title
  );
  const [question3] = useState<string>(tenthStepTranslation?.thirdBlock?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenthFormValues>();

  let gender: string[] = watch('gender');
  let sexualOrientation: string[] = watch('sexualOrientation');
  let validation: string[] = watch('validation');
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
      validation: string[];
      question: string;
      sexualOrientationFreeField: string[];
      age: string;
      genderFreeField: string;
    } = getFormCookies(NINETH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });


    if((reportingPerson === 'organization' && !validation) ||
    validation?.length === 0) {
      dispatch({ type: FORM_ERRORS, payload: true })
    } else if (
      sexualOrientation?.length > 0 &&
      sexualOrientation?.includes(tenthStepTranslation?.secondBlock.data[11]?.label) && sexualOrientationFreeField?.length <= 3
    ) {
      dispatch({ type: FORM_ERRORS, payload: true })
    }else if (
      gender?.length > 0 &&
      gender?.includes(tenthStepTranslation?.firstBlock.data[7]?.label) && genderFreeField?.length <= 3
    ) {
      dispatch({ type: FORM_ERRORS, payload: true })
    }
     else {
      dispatch({ type: FORM_ERRORS, payload: false })
    }

    // (reportingPerson === 'organization' && !validation) ||
    // validation?.length === 0
    //   ? dispatch({ type: FORM_ERRORS, payload: true })
    //   : dispatch({ type: FORM_ERRORS, payload: false });

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
  }, [
    gender,
    genderFreeField,
    sexualOrientationFreeField,
    sexualOrientation,
    validation,
  ]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<TenthFormValues> = (data) => {
     
    let step = getFormStep();
    let dataWithQuestion = { question1, question2, question3, step, ...data };
    setFormCookies(dataWithQuestion, NINETH_FORM);

    dispatch({type:NEXT_STEP,payload:''})
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="ninethForm"
      className="lg:w-[35rem]"
    >
      {reportingPerson !== 'organization' && (
        <>
          <h1 className="font-bold text-3xl mb-4">
            {tenthStepTranslation?.mainTitle}
          </h1>
          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? tenthStepTranslation?.firstBlock?.titleOnBehalf
                  : tenthStepTranslation?.firstBlock?.title
              }
              subTitle={tenthStepTranslation?.firstBlock?.description}
            />
            <div className="-mt-8">
              {tenthStepTranslation?.firstBlock?.data?.map((element: any) => (
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
                {gender &&
                  gender?.includes(
                    tenthStepTranslation?.firstBlock?.data[7]?.value
                  ) && (
                    <InputField
                      name="genderFreeField"
                      props={register('genderFreeField')}
                    />
                  )}
                {gender?.length > 0 &&
                  gender?.includes(
                    tenthStepTranslation?.firstBlock?.data[7]?.value
                  ) &&
                  genderFreeField?.length !== 0 &&
                  formErrors && (
                    <label className="text-red-500 text-xs">
                      {tenthStepTranslation?.minCharacters}
                    </label>
                  )}
              </div>
            </div>
          </div>
          {reportingPerson !== 'andere' && (
            <div className="mt-8">
              <FormHeader
                title={
                  reportingPerson !== 'myself'
                    ? tenthStepTranslation?.secondBlock?.titleOnBehalf
                    : tenthStepTranslation?.secondBlock?.title
                }
                subTitle={tenthStepTranslation?.secondBlock?.description}
              />
              <div className="-mt-8">
                {tenthStepTranslation?.secondBlock?.data?.map(
                  (element: any) => (
                    <Checkbox
                      key={element?.iD}
                      id={element?.id}
                      name={element?.name}
                      props={register('sexualOrientation')}
                      value={element?.value}
                      label={element?.label}
                    />
                  )
                )}

                <div className="ml-4">
                  {sexualOrientation &&
                    sexualOrientation?.includes(
                      tenthStepTranslation?.secondBlock?.data[11]?.value
                    ) && (
                      <InputField
                        name=""
                        props={register('sexualOrientationFreeField')}
                      />
                    )}
                  {sexualOrientation?.length > 0 &&
                    sexualOrientation?.includes(
                      tenthStepTranslation?.secondBlock?.data[11]?.value
                    ) &&
                    sexualOrientationFreeField?.length !== 0 &&
                    formErrors && (
                      <label className="text-red-500 text-xs">
                        {tenthStepTranslation?.minCharacters}
                      </label>
                    )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? tenthStepTranslation?.thirdBlock?.titleOnBehalf
                  : tenthStepTranslation?.thirdBlock?.title
              }
            />
            <div className="-mt-8">
              {
                <RadioGroup
                  options={tenthStepTranslation?.thirdBlock?.data}
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
          <FormHeader title={tenthStepTranslation?.fourthBlock?.title} />
          <div className="-mt-8">
            {tenthStepTranslation?.fourthBlock?.data?.map((element: any) => (
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

export default TenthStep;
