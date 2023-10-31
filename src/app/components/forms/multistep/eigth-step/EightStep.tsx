import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { EightStepProps, EightFormValues } from './eightStep.d';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SEVENTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const EightStep: React.FC<EightStepProps> = ({ eightStepTranslation }) => {
  const { dispatch, isEditing, reportingPerson, formErrors } = useFormContext();
  const [question] = useState<string>(eightStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EightFormValues>();

  let formOfDisc: string = watch('formOfDisc');
  let formOfDiscYes: string[] = watch('formOfDiscYes');
  let formOfDiscYesFreeField: string = watch('formOfDiscYesFreeField');

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // Getting values from the form
    let formValues: {
      formOfDisc: string;
      formOfDiscYes: string[];
      formOfDiscYesFreeField: string;
      question: string;
    } = getFormCookies(SEVENTH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });

    if (formOfDisc) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    if (
      formValues &&
      !formOfDisc &&
      !formOfDiscYes &&
      !formOfDiscYesFreeField
    ) {
      dispatch({ type: FORM_ERRORS, payload: false });
      formOfDisc !== formValues?.formOfDisc &&
        setValue('formOfDisc', formValues?.formOfDisc);
      formOfDiscYes !== formValues?.formOfDiscYes &&
        setValue('formOfDiscYes', formValues?.formOfDiscYes);
      formOfDiscYesFreeField !== formValues?.formOfDiscYesFreeField &&
        setValue('formOfDiscYesFreeField', formValues?.formOfDiscYesFreeField);
    }

    {
      formOfDisc === 'Ja, und zwar:' &&
        dispatch({ type: FORM_ERRORS, payload: true });
    }
    {
      formOfDisc === 'Ja, und zwar:' &&
        formOfDiscYes?.length > 0 &&
        !formOfDiscYes?.includes('Anderes, und zwar:') &&
        dispatch({ type: FORM_ERRORS, payload: false });
    }

    if (formOfDiscYesFreeField?.length >= 4) {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOfDiscYes, formOfDiscYesFreeField, formOfDisc]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<EightFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, SEVENTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="seventhForm"
      className="lg:w-[35rem]"
    >
      <FormHeader title={eightStepTranslation?.title} />
      <div>
        <RadioGroup
          options={eightStepTranslation?.data?.options}
          props={register('formOfDisc')}
          title=""
        />
        <div className="ml-8">
          {formOfDisc === 'Ja, und zwar:' &&
            eightStepTranslation?.data?.optionsYes?.map((element: any) => (
              <Checkbox
                key={element?.iD}
                id={element?.id}
                name={element?.name}
                props={register('formOfDiscYes')}
                value={element?.value}
                label={element?.label}
              />
            ))}

          <div className="ml-4">
            {formOfDiscYes && formOfDiscYes?.includes('Anderes, und zwar:') && (
              <InputField name="" props={register('formOfDiscYesFreeField')} />
            )}
            <div>
              {formOfDiscYes?.length > 0 &&
                formOfDiscYes?.includes('Anderes, und zwar:') &&
                formErrors &&
                formOfDiscYesFreeField?.length !== 0 && (
                  <label className="text-red-500 text-xs">
                    A minimum of 4 Characters is expected
                  </label>
                )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EightStep;
