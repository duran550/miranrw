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
import {
  clearFormCookiesStep,
  getFormCookies,
  getFormStep,
  getReportingPerson,
  setFormCookies,
} from '@/cookies/cookies';
import {
  EIGTH_FORM,
  FIFTH_FORM,
  NINETH_FORM,
  SEVENTH_FORM,
  SIXTH_FORM,
} from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { SixthStepProps, SixthStepValues } from './sixthStep';

const SixthStep: React.FC<SixthStepProps> = ({
  sixthStepTranslation,
  id,
  lang,
}) => {
  const { dispatch, isEditing, formErrors } = useFormContext();
  const reportingPerson = getReportingPerson();
  const [question] = useState<string>(sixthStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SixthStepValues>();

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
    } =
      reportingPerson === 'myself' || reportingPerson === 'andere'
        ? getFormCookies(NINETH_FORM)
        : getFormCookies(EIGTH_FORM);

    // if (id && id === 'seventhForm') {
    //   formValues = getFormCookies(SEVENTH_FORM);
    // }

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
  }, [formOfQueerphobia, otherformOfQueerphobiaFreeField]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SixthStepValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    // setFormCookies(dataWithQuestion, FIFTH_FORM);

    // id && id === 'seventhForm'
    //   ? setFormCookies(dataWithQuestion, SEVENTH_FORM)
    //   : setFormCookies(dataWithQuestion, SIXTH_FORM);

    // id && id === 'eighthForm'
    //   && setFormCookies(dataWithQuestion, EIGTH_FORM)
    //   : setFormCookies(dataWithQuestion, SIXTH_FORM);

    reportingPerson === 'myself' || reportingPerson === 'andere'
      ? setFormCookies(dataWithQuestion, NINETH_FORM)
      : setFormCookies(dataWithQuestion, EIGTH_FORM);

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
      // id={id && id == 'seventhForm' ? 'seventhForm' : 'sixthForm'}
      // id={'seventhForm'}
      // id={'eighthForm'}
      id={
        reportingPerson === 'myself' || reportingPerson === 'andere'
          ? 'eighthForm'
          : 'seventhForm'
      }
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[23.8rem]"
    >
      <div className="">
        <FormHeader
          title={sixthStepTranslation?.title}
          subTitle={sixthStepTranslation?.description}
          paddingHorizontal={3}
          paddingTop={1}
        />
      </div>
      {sixthStepTranslation?.choices
        ?.sort((a, b) => a.label.localeCompare(b.label))
        .map((choice: any, index) => {
          console.log(choice.example, 'example');
          return (
            <div key={choice.iD}>
              <Checkbox
                props={register('formOfQueerphobia')}
                name={choice.name}
                id={choice.id}
                value={choice.value}
                label={choice.label}
              />
              {choice.iD === 9 &&
              formOfQueerphobia &&
              (formOfQueerphobia.includes('Anderes, und zwar') ||
                formOfQueerphobia.includes('Other, specify')) ? (
                <div className="w-full pb-4 ml-8">
                  <InputField
                    name="otherformOfQueerphobiaFreeField"
                    props={register('otherformOfQueerphobiaFreeField', {
                      required: true,
                    })}
                  />
                  {formErrors &&
                    otherformOfQueerphobiaFreeField?.length !== 0 && (
                      <label className="text-red-500 text-xs pb-3">
                        {sixthStepTranslation?.minCharacters}
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

export default SixthStep;
