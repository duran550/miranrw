import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { FifthFormValues, FifthStepProps } from './FifthStep.d';
import RadioSingle from '../../radio/RadioSingle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FOURTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import AutoComplete from '../../auto-complete/AutoComplete';

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question] = useState<string>(fifthStepTranslation?.title);
  const [location, setLocation] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FifthFormValues>();

  let locationOnline: string = watch('locationOnline');
  // Getting form cookies
  let formValues: {
    locationOnline: string;
    location: string;
    question: string;
  } = getFormCookies(FOURTH_FORM);

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    if (!locationOnline) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    if (formValues && !locationOnline && !location) {
      dispatch({ type: FORM_ERRORS, payload: false });
      locationOnline !== formValues?.locationOnline &&
        setValue('locationOnline', formValues?.locationOnline);
      location !== formValues?.location && '';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formValues?.location,
    formValues?.locationOnline,
    location?.length,
    locationOnline,
    location,
  ]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FifthFormValues> = (data) => {
    let step = getFormStep();

    let dataWithQuestion = { question, location, step, ...data };
    setFormCookies(dataWithQuestion, FOURTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 11 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  // Autocomple functions

  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    setLocation(item?.name);
  };

  const handleOnFocus = () => {
    console.log('Focused');
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
      <p className="text-sm -mt-8 mb-8">{fifthStepTranslation?.mandatory}</p>
      <div>
        <RadioSingle
          id={fifthStepTranslation?.firstOption?.id}
          label={fifthStepTranslation?.firstOption?.label}
          name="locationOnline"
          props={register('locationOnline')}
          value={fifthStepTranslation?.firstOption?.value}
        />
      </div>
      <div className="flex flex-col ">
        <RadioSingle
          value={fifthStepTranslation?.secondOption?.value}
          id={fifthStepTranslation?.secondOption.id}
          label={fifthStepTranslation?.secondOption?.title}
          name="locationOnline"
          props={register('locationOnline')}
        />
        <div className="w-full pl-8 my-4">
          {locationOnline == fifthStepTranslation?.secondOption?.value && (
            <AutoComplete
              locationFromParent={location}
              handleOnSelect={handleOnSelect}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default FifthStep;
