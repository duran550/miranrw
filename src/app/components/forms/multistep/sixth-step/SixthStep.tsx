import React, { useEffect, useState } from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FIFTH_FORM } from '@/cookies/cookies.d';

type SixthStepProps = {
  sixthStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

type SixthStepValues = {
  formOfDiscrimination: string[];
  otherForm: string;
};

const SixthStep: React.FC<SixthStepProps> = ({ sixthStepTranslation }) => {
  const { dispatch } = useFormContext();
  const [question] = useState<string>(sixthStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SixthStepValues>();

  let formOfDiscrimination = watch('formOfDiscrimination');
  let otherForm = watch('otherForm');

  // Getting form cookies

  useEffect(() => {
    let formValues: {
      formOfDiscrimination: string[];
      otherForm: string;
      question: string;
    } = getFormCookies(FIFTH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });

    if (formOfDiscrimination?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    if (formValues) {
      dispatch({ type: FORM_ERRORS, payload: false });
      formOfDiscrimination !== formValues?.formOfDiscrimination &&
        setValue('formOfDiscrimination', formValues?.formOfDiscrimination);
      otherForm !== formValues?.otherForm &&
        setValue('otherForm', formValues?.otherForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SixthStepValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, FIFTH_FORM);

    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      id="fifthForm"
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={sixthStepTranslation?.title}
        subTitle={sixthStepTranslation?.description}
      />
      {sixthStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('formOfDiscrimination', { required: true })}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
      {(formOfDiscrimination &&
        formOfDiscrimination?.includes('Anderes, und zwar')) ||
      (formOfDiscrimination &&
        formOfDiscrimination?.includes('Other, specify')) ? (
        <InputField
          name=""
          placeholder=""
          props={register('otherForm', { required: true })}
          title=""
        />
      ) : (
        ''
      )}
    </form>
  );
};

export default SixthStep;
