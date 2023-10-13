import React, { useEffect, useState } from 'react';
import TextArea from '../../text-area/TextArea';
import FormHeader from '../header/header';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThirdFormValues } from './thirdStep.d';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { SECOND_FORM } from '@/cookies/cookies.d';

type ThirdStepProps = {
  thirdStepTranslation: {
    title: string;
    description: string;
    placeholder: string;
    disclaimer: string;
    hints: { title: string; list: string[] };
  };
};

const ThirdStep: React.FC<ThirdStepProps> = ({ thirdStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing } = useFormContext();
  const [question] = useState<string>(thirdStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ThirdFormValues>();

  let description: string = watch('description');
  // Getting form cookies
  let formValues: { description: string; question: string } =
    getFormCookies(SECOND_FORM);

  useEffect(() => {
    if (description && description?.length >= 50) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    // Setting default values if exists in cookies

    if (formValues && !description) {
      description !== formValues?.description &&
        setValue('description', formValues?.description);
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, formValues?.description]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<ThirdFormValues> = (data) => {
    console.log('submit fired');
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };
    setFormCookies(dataWithQuestion, SECOND_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="secondForm"
        className="h-full lg:w-[35rem]"
      >
        <FormHeader
          title={thirdStepTranslation?.title}
          subTitle={thirdStepTranslation?.description}
        />
        <TextArea
          name="vorfall"
          props={register('description')}
          title=""
          placeholder={thirdStepTranslation?.placeholder}
        />
        <p className="flex items-center mt-4 text-sm">
          <span className="text-red-500 mr-2">*</span>
          {thirdStepTranslation?.disclaimer}
        </p>
      </form>

      <div className="mt-16 lg:mt-0 lg:absolute lg:-top-16 lg:-right-[40rem]">
        <FormHeader title={'Mögliche relevante Informationen'}>
          <ul className="list-disc pl-8">
            {thirdStepTranslation?.hints.list?.map((element: string) => (
              <li key="null">{element}</li>
            ))}
          </ul>
        </FormHeader>
      </div>
    </div>
  );
};

export default ThirdStep;
