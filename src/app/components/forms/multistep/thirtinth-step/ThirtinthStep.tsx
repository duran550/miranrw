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
import { SEVENTH_FORM, THIRTINTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { ThirtinthStepProp, ThirtinthStepValues } from './thirtinthStep';

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

  let formOfQueerphobia = watch('formOfQueerphobia');
  let otherformOfQueerphobiaFreeField = watch(
    'otherformOfQueerphobiaFreeField'
  );
  // Scroll on top
  useScrollOnTop();
  // Getting form cookies
  useEffect(() => {
    let formValues: {
      formOfQueerphobia: string[];
      otherformOfQueerphobiaFreeField: string;
      question: string;
    } = getFormCookies(THIRTINTH_FORM);
    if (id && id === 'thirtinthForm') {
      formValues = getFormCookies(THIRTINTH_FORM);
    }
    // dispatch({ type: FORM_ERRORS, payload: false });
    // if (formOfQueerphobia.length<0) {
    //   dispatch({ type: FORM_ERRORS, payload: true });
    // }
    if (formValues && !formOfQueerphobia && !otherformOfQueerphobiaFreeField) {
      dispatch({ type: FORM_ERRORS, payload: false });
      formOfQueerphobia !== formValues?.formOfQueerphobia &&
        setValue('formOfQueerphobia', formValues?.formOfQueerphobia);
      otherformOfQueerphobiaFreeField !==
        formValues?.otherformOfQueerphobiaFreeField &&
        setValue(
          'otherformOfQueerphobiaFreeField',
          formValues?.otherformOfQueerphobiaFreeField
        );
    } else if (
      (formOfQueerphobia &&
        formOfQueerphobia?.includes('Anderes, und zwar') &&
        otherformOfQueerphobiaFreeField?.length <= 3) ||
      (formOfQueerphobia &&
        formOfQueerphobia?.includes('Other, specify') &&
        otherformOfQueerphobiaFreeField?.length <= 3)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOfQueerphobia, otherformOfQueerphobiaFreeField]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<ThirtinthStepValues> = (data) => {
    console.log('did i get here?')
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    // setFormCookies(dataWithQuestion, FIFTH_FORM);
    // id && id === 'thirtinthForm' && 
    setFormCookies(dataWithQuestion, THIRTINTH_FORM)
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
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={thirtinthStepTranslation?.title}
        subTitle={thirtinthStepTranslation?.description}
      />
      {thirtinthStepTranslation?.choices?.sort((a, b) => a.label.localeCompare(b.label)).map((choice: any, index) => {

        return (
          <div key={choice.iD}>
            <Checkbox
              props={register('formOfQueerphobia')}
              name={choice.name}
              id={choice.id}
              value={choice.value}
              label={choice.label}
            />

            {(
              ((lang === 'en' && choice.iD === 17) || (lang === 'de' && index === 2)) &&
              (formOfQueerphobia &&
                (formOfQueerphobia.includes('Anderes, und zwar') ||
                  formOfQueerphobia.includes('Other, specify')))
            ) ? (
              <div className="w-full pb-4 ml-8">
                <InputField
                  name="otherformOfQueerphobiaFreeField"
                  props={register('otherformOfQueerphobiaFreeField', {
                    required: true,
                  })}
                />
                {formErrors && otherformOfQueerphobiaFreeField?.length !== 0 && (
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
