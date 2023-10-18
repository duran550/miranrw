import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { FifthFormValues, FifthStepProps } from './FifthStep.d';
import RadioSingle from '../../radio/RadioSingle';
import InputField from '../../text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FOURTH_FORM } from '@/cookies/cookies.d';

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question] = useState<string>(fifthStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FifthFormValues>();

  let locationOnline: string = watch('locationOnline');
  let location: string = watch('location');
  // Getting form cookies
  let formValues: {
    locationOnline: string;
    location: string;
    question: string;
  } = getFormCookies(FOURTH_FORM);

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: false });

    // { location?.length <= 3 && dispatch({ type: FORM_ERRORS, payload: true })}
     {fifthStepTranslation &&  dispatch({ type: FORM_ERRORS, payload: false })}

    if(location?.length <= 3) {
      dispatch({ type: FORM_ERRORS, payload: true })
    } 

    console.log(fifthStepTranslation)
    // console.log(location, "location")

    if (formValues) {
      dispatch({ type: FORM_ERRORS, payload: false });
      locationOnline !== formValues?.locationOnline &&
        setValue('locationOnline', formValues?.locationOnline);
      location !== formValues?.location &&
        setValue('location', formValues?.location); 
    }

    if(locationOnline === fifthStepTranslation?.firstOption?.value) {
      setValue("location", "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.location, formValues?.locationOnline, location?.length, locationOnline, location ]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FifthFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, FOURTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="fourthForm"
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={fifthStepTranslation?.title}
        subTitle={fifthStepTranslation?.description}
      />
      <div>
        <RadioSingle
          id={fifthStepTranslation?.firstOption?.id}
          label={fifthStepTranslation?.firstOption?.label}
          name="locationOnline"
          props={register('locationOnline')}
          value={fifthStepTranslation?.firstOption?.value}
        />
      </div>
      <div className="flex justify-between items-center space-x-4">
        <RadioSingle
          value={fifthStepTranslation?.secondOption?.value}
          id={fifthStepTranslation?.secondOption.id}
          label={fifthStepTranslation?.secondOption?.label}
          name="locationOnline"
          props={register('locationOnline')}
        />
        <div className="w-full">
          {locationOnline == fifthStepTranslation?.secondOption?.value && (
            <InputField
              name="location"
              placeholder=""
              props={register('location')}
              title=""
            />
          )}
          <div>
            {formErrors && location?.length > 0 &&  (
                <label className="text-red-500 text-xs">
                  A minimum of 3 Characters is expected
                </label>
              )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FifthStep;
