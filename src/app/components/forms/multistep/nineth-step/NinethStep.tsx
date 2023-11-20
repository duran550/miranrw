import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { EIGTH_FORM, NINETH_FORM } from '@/cookies/cookies.d';
import { NinethFormValues, NinethStepProps } from './ninethStep';

const NinethStep: React.FC<NinethStepProps> = ({
  ninethStepTranslation,
  id,
}) => {
  const { dispatch, isEditing, reportingPerson, formErrors } = useFormContext();
  const [question] = useState<string>(ninethStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NinethFormValues>();

  let haveYouReported: string = watch('haveYouReported');
  let haveYouReportedYes: string[] = watch('haveYouReportedYes');
  let haveYouReportedYesFreeField1: string = watch(
    'haveYouReportedYesFreeField1'
  );
  let haveYouReportedYesFreeField2: string = watch(
    'haveYouReportedYesFreeField2'
  );

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: false });
    // Getting values from the form
    let formValues: {
      haveYouReported: string;
      haveYouReportedYes: string[];
      haveYouReportedYesFreeField1: string;
      haveYouReportedYesFreeField2: string;
      question: string;
    } = getFormCookies(EIGTH_FORM);

    //   Setting values in the fields

    if (formValues && !haveYouReported) {
      haveYouReported !== formValues.haveYouReported &&
        setValue('haveYouReported', formValues?.haveYouReported);

      haveYouReported !== formValues.haveYouReported &&
        setValue('haveYouReportedYes', formValues?.haveYouReportedYes);

      haveYouReportedYesFreeField1 !==
        formValues.haveYouReportedYesFreeField1 &&
        setValue(
          'haveYouReportedYesFreeField1',
          formValues?.haveYouReportedYesFreeField1
        );

      haveYouReportedYesFreeField2 !==
        formValues.haveYouReportedYesFreeField2 &&
        setValue(
          'haveYouReportedYesFreeField2',
          formValues?.haveYouReportedYesFreeField2
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveYouReported]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<NinethFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    id === 'ninethForm'
      ? setFormCookies(dataWithQuestion, NINETH_FORM)
      : setFormCookies(dataWithQuestion, EIGTH_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 11 })
      : dispatch({ type: NEXT_STEP, payload: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={id === 'ninethForm' ? 'ninethForm' : 'eighthForm'}
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={ninethStepTranslation?.title}
        subTitle={ninethStepTranslation?.description}
      />
      <div>
        <RadioGroup
          options={ninethStepTranslation?.data?.options}
          props={register('haveYouReported')}
        />
        <div className="ml-8">
          {haveYouReported ===
            ninethStepTranslation?.data?.options[1]?.value && (
            <>
              {haveYouReported && (
                <p className="text-xs">{ninethStepTranslation?.mandatory}</p>
              )}
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[0]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[0]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[0]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[0]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[0]?.label}
                />
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[1]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[1]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[1]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[1]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[1]?.label}
                />
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[2]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[2]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[2]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[2]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[2]?.label}
                />
                {/* First freeText field */}
                {haveYouReportedYes &&
                  haveYouReportedYes?.includes(
                    ninethStepTranslation?.data?.optionsYes[2].value
                  ) && (
                    <div className="lg:ml-16 -mt-6 mb-4">
                      <InputField
                        name="haveYouReportedYesFreeField1"
                        props={register('haveYouReportedYesFreeField1', {
                          required: true,
                        })}
                      />
                      <p className="text-xs my-4 text-red-600">
                        {errors?.haveYouReportedYesFreeField1 &&
                          ninethStepTranslation?.minCharacters}
                      </p>
                    </div>
                  )}
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[3]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[3]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[3]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[3]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[3]?.label}
                />
              </div>
            </>
          )}

          {/* Second freeText field */}

          {haveYouReportedYes &&
            haveYouReportedYes?.includes(
              ninethStepTranslation?.data?.optionsYes[3].value
            ) && (
              <div className="lg:ml-16 -mt-6">
                <InputField
                  name="haveYouReportedYesFreeField2"
                  props={register('haveYouReportedYesFreeField2', {
                    required: true,
                  })}
                />
                <p className="text-xs my-4 text-red-600">
                  {errors?.haveYouReportedYesFreeField2 &&
                    ninethStepTranslation?.minCharacters}
                </p>
              </div>
            )}
        </div>
      </div>
    </form>
  );
};

export default NinethStep;
