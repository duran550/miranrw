import React, { useEffect, useState } from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import {
  FORM_ERRORS,
  JUMP_STEP_FOR_WITNESS,
  LAST_STEP,
  NEXT_STEP,
} from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SEVENTH_FORM, SIXTH_FORM, THIRTINTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { ThirtinthStepProp, ThirtinthStepValues } from './thirtinthStep';
import CheckboxWithQ from '../../checkbox/CheckboxWithQ';

const ThirtinthStep: React.FC<ThirtinthStepProp> = ({ thirtinthStepTranslation, id, lang }) => {
  const { dispatch, isEditing, reportingPerson, formErrors } = useFormContext();
  const [question] = useState<string>(thirtinthStepTranslation?.title);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ThirtinthStepValues>();

  let disciminationArea = watch('disciminationArea');
  let otherformOfDiscriminationAreaFreeField = watch(
    'otherformOfDiscriminationAreaFreeField'
  );
  // Scroll on top
  useScrollOnTop();
  // Getting form cookies
  useEffect(() => {
    let formValues: {
      disciminationArea: string[];
      otherformOfDiscriminationAreaFreeField: string;
      question: string;
    } = getFormCookies(SIXTH_FORM);
    // if (id && id === 'thirtinthForm') {
    //   formValues = getFormCookies(THIRTINTH_FORM);
    // }
    // dispatch({ type: FORM_ERRORS, payload: false });
    // if (formOfQueerphobia.length<0) {
    //   dispatch({ type: FORM_ERRORS, payload: true });
    // }
    if (formValues && !disciminationArea && !otherformOfDiscriminationAreaFreeField) {
      dispatch({ type: FORM_ERRORS, payload: false });
      disciminationArea !== formValues?.disciminationArea &&
        setValue('disciminationArea', formValues?.disciminationArea);
        otherformOfDiscriminationAreaFreeField !==
        formValues?.otherformOfDiscriminationAreaFreeField &&
        setValue(
          'otherformOfDiscriminationAreaFreeField',
          formValues?.otherformOfDiscriminationAreaFreeField
        );
    } else if (
      (disciminationArea &&
        disciminationArea?.includes('Anderes, und zwar') &&
        otherformOfDiscriminationAreaFreeField?.length <= 3) ||
      (disciminationArea &&
        disciminationArea?.includes('Other, specify') &&
        otherformOfDiscriminationAreaFreeField?.length <= 3)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(formValues, 'thirtinthStep')
  }, [disciminationArea, otherformOfDiscriminationAreaFreeField]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<ThirtinthStepValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    // setFormCookies(dataWithQuestion, FIFTH_FORM);
    // id && id === 'thirtinthForm' && 
    setFormCookies(dataWithQuestion, SIXTH_FORM)
    dispatch({ type: NEXT_STEP, payload: '' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // !isEditing && reportingPerson === 'andere'
    //   ? dispatch({ type: JUMP_STEP_FOR_WITNESS, payload: '' })
    //   : dispatch({ type: NEXT_STEP, payload: '' });
  };


  return (
    <form
      // id={id && id == 'thirtinthForm' ? 'thirtinthForm' : 'seventhForm'}
      id={'thirtinthForm'}
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[25rem]"
    >
      <div className="">
        <FormHeader
          title={thirtinthStepTranslation?.title}
          subTitle={thirtinthStepTranslation?.description}
          paddingHorizontal={3}
          paddingTop={1}
        />
      </div>
      {thirtinthStepTranslation?.choices?.sort((a, b) => a.label.localeCompare(b.label)).map((choice: any, index) => {

        return (
          <div key={choice.iD}>
            <CheckboxWithQ
            variant="black"
              props={register('disciminationArea')}
              name={choice.name}
              id={choice.id}
              examples={choice?.examples}
              value={choice.value}
              label={choice.label}
            />

            {(
              ((lang === 'en' && choice.iD === 17) || (lang === 'de' && index === 2)) &&
              (disciminationArea &&
                (disciminationArea.includes('Anderes, und zwar') ||
                disciminationArea.includes('Other, specify')))
            ) ? (
              <div className="w-full pb-4 ml-14">
                <InputField
                  name="otherformOfDiscriminationAreaFreeField"
                  props={register('otherformOfDiscriminationAreaFreeField', {
                    required: true,
                  })}
                />
                {formErrors && otherformOfDiscriminationAreaFreeField?.length !== 0 && (
                  <label className="text-red-500 text-xs pb-3">
                    {thirtinthStepTranslation?.description}
                  </label>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        );
      })}

      {/* {(formOfQueerphobia &&
        formOfQueerphobia?.includes('Anderes, und zwar')) ||
      (formOfQueerphobia && formOfQueerphobia?.includes('Other, specify')) ? (
        <div className="w-full pb-4">
          <InputField
            name="otherformOfQueerphobiaFreeField"
            props={register('otherformOfQueerphobiaFreeField', {
              required: true,
            })}
          />
          {formErrors && otherformOfQueerphobiaFreeField?.length !== 0 && (
            <label className="text-red-500 text-xs pb-3">
              {sixthStepTranslation?.minCharacters}
            </label>
          )}
        </div>
      ) : (
        ''
      )} */}
      {/* <div>
        {formErrors && otherformOfQueerphobiaFreeField?.length !== 0 && (
          <label className="text-red-500 text-xs pb-3">
            {sixthStepTranslation?.minCharacters}
          </label>
        )}
      </div> */}
    </form>
  );
};

export default ThirtinthStep;
