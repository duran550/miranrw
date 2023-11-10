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
  const [location, setLocation] = useState<string>();
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
    dispatch({ type: FORM_ERRORS, payload: false });

    if (
      location &&
      location?.length <= 3 &&
      locationOnline == fifthStepTranslation?.secondOption?.value
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else if (!locationOnline) {
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
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  console.log(location);

  // Autocomple functions

  const handleOnSearch = (string: string, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

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
            <AutoComplete handleOnSelect={handleOnSelect} />
          )}
          <div>
            {formErrors && location && location?.length > 0 && (
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
