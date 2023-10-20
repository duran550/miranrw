import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SIXTH_FORM } from '@/cookies/cookies.d';

type SeventhStepProps = {
  seventhStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

type SeventhStepValues = {
  typeOfDiscrimination: string[];
  typeOfDiscriminationFreeField: string;
};

const SeventhStep: React.FC<SeventhStepProps> = ({
  seventhStepTranslation,
}) => {
  const { dispatch, isEditing, reportingPerson, formErrors } = useFormContext();

  const [question] = useState<string>(seventhStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SeventhStepValues>();

  let typeOfDiscrimination = watch('typeOfDiscrimination');
  let typeOfDiscriminationFreeField = watch('typeOfDiscriminationFreeField');

  useEffect(() => {
    let formValues: {
      typeOfDiscrimination: string[];
      typeOfDiscriminationFreeField: string;
      question: string;
    } = getFormCookies(SIXTH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });

    if (typeOfDiscrimination?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    if (formValues && !typeOfDiscrimination && !typeOfDiscriminationFreeField) {
      dispatch({ type: FORM_ERRORS, payload: false });
      typeOfDiscrimination !== formValues?.typeOfDiscrimination &&
        setValue('typeOfDiscrimination', formValues?.typeOfDiscrimination);
      typeOfDiscriminationFreeField !==
        formValues?.typeOfDiscriminationFreeField &&
        setValue(
          'typeOfDiscriminationFreeField',
          formValues?.typeOfDiscriminationFreeField
        );
    } else if (
      (typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Anderes, und zwar') &&
        typeOfDiscriminationFreeField.length <= 3) ||
      (typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Other, specify') &&
        typeOfDiscriminationFreeField?.length <= 3)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOfDiscrimination, typeOfDiscriminationFreeField]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SeventhStepValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, SIXTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="sixthForm"
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={seventhStepTranslation?.title}
        subTitle={seventhStepTranslation?.description}
      />
      {seventhStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('typeOfDiscrimination', { required: true })}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
      {(typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Anderes, und zwar')) ||
      (typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Other, specify')) ? (
        <InputField
          name=""
          placeholder=""
          props={register('typeOfDiscriminationFreeField', { required: true })}
          title=""
        />
      ) : (
        ''
      )}
      <div>
        {formErrors && typeOfDiscriminationFreeField?.length !== 0 && (
          <label className="text-red-500 text-xs">
            A minimum of 4 Characters is expected
          </label>
        )}
      </div>
    </form>
  );
};

export default SeventhStep;
