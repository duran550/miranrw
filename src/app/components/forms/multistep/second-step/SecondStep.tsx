import React, { useEffect, useState } from 'react';
import RadioGroup from '../../radio/RadioGroup';
import FormHeader from '../header/header';
import { SecondFormValues, SecondStepProps } from './secondStep';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import {
  FORM_ERRORS,
  LAST_STEP,
  NEXT_STEP,
  REPORTING_PERSON,
} from '@/app/context/actions';
import { clearFormCookiesStep, getFormCookies, getFormStep, removeReportingPerson, setFormCookies, setReportingPerson } from '@/cookies/cookies';
import { FIRST_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const SecondStep: React.FC<SecondStepProps> = ({ secondStepTranslation }, id) => {
  const { dispatch, reportingPerson, isEditing } = useFormContext();
  const [question] = useState<string>(secondStepTranslation?.title);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SecondFormValues>();

  let identity: string = watch('identity');

  // Getting form cookies
  let formValues: { identity: string; question: string } =
    getFormCookies(FIRST_FORM);

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // Check if field is selected and throw an error if not
    if (!identity && !formValues) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
      const reportingPersonType =
      identity === secondStepTranslation?.options[0].value
        ? 'myself'
        : identity === secondStepTranslation?.options[1].value
        ? 'andere'
        : 'organization';

    // Reset the cookie if a different option is selected
    removeReportingPerson();
    setReportingPerson(reportingPersonType);

    dispatch({
      type: REPORTING_PERSON,
      payload: reportingPersonType,
    });

      // Setting default values if exists in cookies
      if (formValues && !identity) {
        identity !== formValues?.identity &&
          setValue('identity', formValues?.identity);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(formValues, 'formvalue')
  }, [identity, formValues?.identity, dispatch, setValue]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SecondFormValues> = (data) => {
   
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, FIRST_FORM);
    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <div className="relative flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="firstForm"
        className="h-[full] lg:w-[24rem]"
      >
        <div className=''>
          <FormHeader title={secondStepTranslation?.title} mandatory={secondStepTranslation?.mandatory} paddingHorizontal={4} paddingTop={2}/>
        </div>

        <div className='-ml-3'>
          <RadioGroup
            props={register('identity', { required: true })}
            options={secondStepTranslation?.options}
          />
        </div>
      </form>
      {/* {identity === secondStepTranslation?.options[2].value && (
        <div className="mt-4 max-w-lg lg:absolute lg:mt-0 lg:-right-[40rem]">
          <FormHeader
            title={secondStepTranslation?.onBehalfHints?.title}
            subTitle={secondStepTranslation?.onBehalfHints?.description}
          />
        </div>
      )} */}
    </div>
  );
};

export default SecondStep;
