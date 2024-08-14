import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SEVENTH_FORM, SIXTH_FORM, FIFTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { SeventhStepProps, SeventhStepValues } from './seventhStep';

const SeventhStep: React.FC<SeventhStepProps> = ({
  seventhStepTranslation,
  id,
  lang,
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
    } = getFormCookies(FIFTH_FORM);




    dispatch({ type: FORM_ERRORS, payload: true });

    if (
      !typeOfDiscrimination
    ) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      if (typeOfDiscrimination && typeOfDiscrimination.length > 0 && typeOfDiscrimination.includes(seventhStepTranslation.choices[seventhStepTranslation.choices.length - 1].value)) {
        dispatch({ type: FORM_ERRORS, payload: true });
        if ((typeOfDiscriminationFreeField && typeOfDiscriminationFreeField.length > 3)) {
          dispatch({ type: FORM_ERRORS, payload: false });
        } else {
          dispatch({ type: FORM_ERRORS, payload: true });
        }
      }
      if (
        typeOfDiscrimination &&
        typeOfDiscrimination.length > 0 &&
        !typeOfDiscrimination.includes(
          seventhStepTranslation.choices[
            seventhStepTranslation.choices.length - 1
          ].value
        )
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
        typeOfDiscrimination?.includes(
          typeOfDiscrimination[typeOfDiscrimination.length - 1]
        ) &&
        typeOfDiscriminationFreeField &&
        typeOfDiscriminationFreeField.length <= 3) ||
      (typeOfDiscrimination &&
        typeOfDiscrimination?.includes(
          typeOfDiscrimination[typeOfDiscrimination.length - 1]
        ) &&
        !typeOfDiscriminationFreeField)
    ) {
      // dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOfDiscrimination, typeOfDiscriminationFreeField]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SeventhStepValues> = (data) => {

    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, FIFTH_FORM);
    //  console.log('step',step);


    dispatch({ type: NEXT_STEP, payload: '' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  console.log(lang, 'mylang')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={'fifthForm'}
      className="lg:w-[38rem]"
    >
      <FormHeader
        title={seventhStepTranslation?.title}
        subTitle={seventhStepTranslation?.description}
      />
      {seventhStepTranslation.choices?.sort((a, b) => a.label.localeCompare(b.label)).map((choice: any, index) => {
        console.log(lang === 'en' && index === 3, 'lang==en')
        console.log(lang === 'de' && index === 0, 'lang==de')
        return (
          <div key={choice.iD}>
            <Checkbox
              props={register('typeOfDiscrimination')}
              name={choice.name}
              id={choice.id}
              value={choice.value}
              label={choice.label}
            />
            {((lang === 'en' && index === 3) || (lang === 'de' && index === 0)) &&
              (typeOfDiscrimination &&
                (typeOfDiscrimination.includes('Anderes, und zwar') ||
                  typeOfDiscrimination.includes('Other, specify'))) ? (
              <div className="w-full pb-4 ml-8">
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
          </div>
        )
      })}

      {/* {(typeOfDiscrimination &&
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
          )} */}
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
