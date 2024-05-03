import React, { useEffect, useState } from 'react';
import TextArea from '../../text-area/TextArea';
import FormHeader from '../header/header';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThirdFormValues } from './thirdStep.d';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FOURTH_FORM, SECOND_FORM, THIRD_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

type ThirdStepProps = {
  thirdStepTranslation: {
    title: string;
    description: string;
    placeholder: string;
    disclaimer: string;
    mandatory: string;
    minCharacters: string;
    hints: { title: string; list: string[] };
  };
  id?: string;
};

const ThirdStep: React.FC<ThirdStepProps> = ({ thirdStepTranslation, id }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question] = useState<string>(thirdStepTranslation?.title);

  // Dynamic hints description

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ThirdFormValues>();

  // const watchAllFields = watch();
  let description: string = watch('description');
  // Getting form cookies
 

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
     let formValues: { description: string; question: string } =
       getFormCookies(SECOND_FORM);
   

     if (id && id == 'fourthForm') {
       formValues = getFormCookies(FOURTH_FORM);
     }
 
    
    dispatch({ type: FORM_ERRORS, payload: true });
    if (description && description?.length >= 50) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    // Setting default values if exists in cookies
if (!description || (description && description.length<50)) {
   dispatch({ type: FORM_ERRORS, payload: true });
}else{
   dispatch({ type: FORM_ERRORS, payload: false });
}


    if (formValues && !description) {
      description !== formValues?.description &&
        setValue('description', formValues?.description);
     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<ThirdFormValues> = (data) => {
    
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...data };

     id !== 'fourthForm'
      ? setFormCookies(dataWithQuestion, SECOND_FORM)
      : setFormCookies(dataWithQuestion, FOURTH_FORM);

    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={id === 'fourthForm' ? 'fourthForm' : 'secondForm'}
        className="h-full lg:w-[35rem]"
      >
        <FormHeader
          title={thirdStepTranslation?.title}
          subTitle={thirdStepTranslation?.description}
        />
        <p className="text-sm -mt-12 mb-8">{thirdStepTranslation?.mandatory}</p>
        <TextArea
          name="vorfall"
          props={register('description',{required:true, minLength:50})}
          placeholder={thirdStepTranslation?.placeholder}
          type="text"
        />
        {formErrors && description?.length !== 0 && (
          <label className="text-red-500 text-xs pl-2">
            {thirdStepTranslation?.minCharacters}
          </label>
        )}
        <p className="flex items-center mt-4 text-xs text-red-600 pb-3  pl-0">
          <span className="mr-2"></span>
          {thirdStepTranslation?.disclaimer}
        </p>
      </form>

      <div className="mt-16 w-full md:max-w-md lg:mt-8  2xl:mt-0 2xl:absolute  lg:-top-0 lg:-right-[38rem]">
        <FormHeader title={thirdStepTranslation?.hints?.title}>
          {reportingPerson !== 'onBehalf' ? (
            <ul className="list-disc pl-8">
              {thirdStepTranslation?.hints?.list.map((element: string) => (
                <li key={`${element}`}>{element}</li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc pl-8">
              {thirdStepTranslation?.hints?.list
                ?.slice(0, thirdStepTranslation?.hints?.list?.length - 1)
                ?.map((element: string) => (
                  <li key={`${element}`}>{element}</li>
                ))}
            </ul>
          )}
        </FormHeader>
      </div>
    </div>
  );
};

export default ThirdStep;
