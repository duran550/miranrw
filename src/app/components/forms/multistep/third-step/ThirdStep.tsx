import React, { useEffect } from 'react';
import TextArea from '../../text-area/TextArea';
import FormHeader from '../header/header';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';
import { useForm } from 'react-hook-form';
import { ThirdFormValues } from './thirdStep.d';

type ThirdStepProps = {
  thirdStepTranslation: {
    title: string;
    description: string;
    hints: { title: string; list: string[] };
  };
};

const ThirdStep: React.FC<ThirdStepProps> = ({ thirdStepTranslation }) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ThirdFormValues>();

  let description: string = watch('description');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (description) {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  return (
    <div className="relative w-full">
      <div className="h-full lg:w-[35rem]">
        <FormHeader
          title={thirdStepTranslation?.title}
          subTitle={thirdStepTranslation?.description}
        />
        <TextArea
          name="vorfall"
          props={register('description', { required: true })}
          title=""
          placeholder=""
        />
      </div>

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
