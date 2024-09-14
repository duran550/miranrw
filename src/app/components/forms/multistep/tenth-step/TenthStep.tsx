import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { TenthStepProps, TenthFormValues } from './tenthStep';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import {
  clearFormCookiesStep,
  getFormCookies,
  getFormStep,
  getReportingPerson,
  setFormCookies,
} from '@/cookies/cookies';
import {
  FOURTH_FORM,
  NINETH_FORM,
  SECOND_FORM,
  THIRD_FORM,
} from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const TenthStep: React.FC<TenthStepProps> = ({ tenthStepTranslation }, id) => {
  const { dispatch, isEditing, formErrors } = useFormContext();
  const reportingPerson = getReportingPerson();
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

  console.log(
    // gender?.length > 0 &&
    sexualOrientation?.length > 0 &&
      sexualOrientation?.includes(
        tenthStepTranslation?.secondBlock.data[13]?.label
      ),
    'log00'
  );

  // console.log(genderFreeField?.length, 'randomdata00');

  console.log(sexualOrientation, 'log01');
  console.log(tenthStepTranslation?.secondBlock.data[13]?.label, 'log02');

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
    } = getFormCookies(THIRD_FORM);

    // Form validation
    dispatch({ type: FORM_ERRORS, payload: false });
    if (
      sexualOrientation?.length > 0 &&
      sexualOrientation?.includes(
        tenthStepTranslation?.secondBlock.data[13]?.label
      )
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
      if (sexualOrientationFreeField?.length <= 3) {
        dispatch({ type: FORM_ERRORS, payload: true });
      } else {
        dispatch({ type: FORM_ERRORS, payload: false });
      }
    }

    if (
      gender?.length > 0 &&
      gender?.includes(tenthStepTranslation?.firstBlock.data[10]?.label)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
      if (genderFreeField?.length <= 3) {
        dispatch({ type: FORM_ERRORS, payload: true });
      } else {
        dispatch({ type: FORM_ERRORS, payload: false });
      }
    }

    // organization validation
    if (
      (reportingPerson === 'organization' && !validation) ||
      validation?.length === 0
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    // Setting default values if the data are available in cookies
    if (formValues) {
      // dispatch({ type: FORM_ERRORS, payload: false });
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
    setFormCookies(dataWithQuestion, THIRD_FORM);

    // setFormCookies(dataWithQuestion, NINETH_FORM);
    dispatch({ type: NEXT_STEP, payload: '' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: '' });
  };

  return (
    <div className="relative lg:w-[30rem]">
      <h1 className="font-rubik font-black xl:text-[28px] mb-4 ml-[105px] scale-150">
        {tenthStepTranslation?.mainTitle}
      </h1>
      {reportingPerson === 'andere' && (
        <div className="w-full xl:w-[22vw] xl:absolute xl:left-[34rem] xl:top-14">
          <div className="lg:bg-white mb-8 md:mb-12 border-primaryColor border-2 rounded-md p-4 h-[116px]">
            <h1 className=" font-rubik font-black text-2xl mb-2">
              {tenthStepTranslation.firstBlock.secondTitle}
            </h1>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        // id="ninethForm"
        // id={id === 'fourthForm' ? 'fourthForm' : 'secondForm'}
        id={'secondForm'}
        className=""
      >
        <div className="lg:w-[24rem]">
          {reportingPerson !== 'organization' && (
            <div className="">
              <div className="mt-0">
                <div className="xl:w-[23rem]">
                  <FormHeader
                    title={
                      reportingPerson !== 'myself'
                        ? tenthStepTranslation?.firstBlock?.titleOnBehalf
                        : tenthStepTranslation?.firstBlock?.title
                    }
                    subTitle={tenthStepTranslation?.firstBlock?.description}
                    paddingHorizontal={3}
                    paddingTop={1}
                  />
                </div>
                <div className="-mt-8">
                  {tenthStepTranslation?.firstBlock?.data?.map(
                    (element: any) => (
                      <Checkbox
                        key={element?.iD}
                        id={element?.id}
                        name={element?.name}
                        props={register('gender')}
                        value={element?.value}
                        label={element?.label}
                      />
                    )
                  )}
                  <div className="ml-14">
                    {gender &&
                      gender?.includes(
                        tenthStepTranslation?.firstBlock?.data[10]?.value
                      ) && (
                        <InputField
                          name="genderFreeField"
                          props={register('genderFreeField')}
                        />
                      )}
                    {gender?.length > 0 &&
                      gender?.includes(
                        tenthStepTranslation?.firstBlock?.data[10]?.value
                      ) &&
                      genderFreeField?.length !== 0 &&
                      genderFreeField?.length <= 3 &&
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
                  <div className="xl:w-[24rem]">
                    <FormHeader
                      title={
                        reportingPerson !== 'myself'
                          ? tenthStepTranslation?.secondBlock?.titleOnBehalf
                          : tenthStepTranslation?.secondBlock?.title
                      }
                      subTitle={tenthStepTranslation?.secondBlock?.description}
                      paddingHorizontal={3}
                      paddingTop={1}
                    />
                  </div>
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

                    <div className="ml-14">
                      {sexualOrientation &&
                        sexualOrientation?.includes(
                          tenthStepTranslation?.secondBlock?.data[13]?.value
                        ) && (
                          <InputField
                            name=""
                            props={register('sexualOrientationFreeField')}
                          />
                        )}
                      {sexualOrientation?.length > 0 &&
                        sexualOrientation?.includes(
                          tenthStepTranslation?.secondBlock?.data[13]?.value
                        ) &&
                        sexualOrientationFreeField?.length !== 0 &&
                        sexualOrientationFreeField?.length < 3 &&
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
                <div className="">
                  <FormHeader
                    title={
                      reportingPerson !== 'myself'
                        ? tenthStepTranslation?.thirdBlock?.titleOnBehalf
                        : tenthStepTranslation?.thirdBlock?.title
                    }
                    paddingHorizontal={3}
                    paddingTop={1}
                  />
                </div>
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
            </div>
          )}

          {reportingPerson === 'organization' && (
            <div className="mt-8">
              <FormHeader title={tenthStepTranslation?.fourthBlock?.title} />
              <div className="-mt-8">
                {tenthStepTranslation?.fourthBlock?.data?.map(
                  (element: any) => (
                    <Checkbox
                      key={element?.iD}
                      id={element?.id}
                      name={element?.name}
                      props={register('validation')}
                      value={element?.value}
                      label={element?.label}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TenthStep;
