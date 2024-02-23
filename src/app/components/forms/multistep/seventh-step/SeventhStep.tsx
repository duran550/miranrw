import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SEVENTH_FORM, SIXTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { SeventhStepProps, SeventhStepValues } from './seventhStep';

const SeventhStep: React.FC<SeventhStepProps> = ({
  seventhStepTranslation,
  id,
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

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    let formValues: {
      typeOfDiscrimination: string[];
      typeOfDiscriminationFreeField: string;
      question: string;
    } = getFormCookies(SIXTH_FORM);

    if (id && id === 'seventhForm') {
      formValues = getFormCookies(SEVENTH_FORM);
    }

    dispatch({ type: FORM_ERRORS, payload: true });

    if (
      !typeOfDiscrimination ||
      (typeOfDiscrimination && typeOfDiscrimination?.length !== 0)
    ) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
     if (typeOfDiscrimination && typeOfDiscrimination.length>0 && typeOfDiscrimination.includes(seventhStepTranslation.choices[8].value)) {
      dispatch({ type: FORM_ERRORS, payload: true });
      if (typeOfDiscriminationFreeField.length>3) {
        dispatch({ type: FORM_ERRORS, payload: false });
      }else{
        dispatch({ type: FORM_ERRORS, payload: true });
      }
     }
      if (
        typeOfDiscrimination &&
        typeOfDiscrimination.length > 0 &&
        !typeOfDiscrimination.includes(seventhStepTranslation.choices[8].value)
      ) {
        dispatch({ type: FORM_ERRORS, payload: false });
      }
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

    id === 'seventhForm'
      ? setFormCookies(dataWithQuestion, SEVENTH_FORM)
      : setFormCookies(dataWithQuestion, SIXTH_FORM);

     dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={id === 'seventhForm' ? 'seventhForm' : 'sixthForm'}
      className="lg:w-[38rem]"
    >
      <FormHeader
        title={seventhStepTranslation?.title}
        subTitle={seventhStepTranslation?.description}
      />
      {seventhStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('typeOfDiscrimination')}
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
        <div className="w-full pb-4 ">
          <InputField
            name="typeOfDiscriminationFreeField"
            placeholder=""
            props={register('typeOfDiscriminationFreeField', {
              required: true,
            })}
            title=""
          />
          {formErrors && typeOfDiscriminationFreeField?.length !== 0 && (
            <label className="text-red-500 text-xs pb-3">
              {seventhStepTranslation?.minCharacters}
            </label>
          )}
        </div>
      ) : (
        ''
      )}
      {/* <div>
        {formErrors && typeOfDiscriminationFreeField?.length !== 0 && (
          <label className="text-red-500 text-xs">
            {seventhStepTranslation?.minCharacters}
          </label>
        )}
      </div> */}
    </form>
  );
};

export default SeventhStep;
