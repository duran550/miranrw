import React, { useEffect } from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';

type SixthStepProps = {
  sixthStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

type SixthStepValues = {
  formOfDiscrimination: string[];
  otherForm: string;
};

const SixthStep: React.FC<SixthStepProps> = ({ sixthStepTranslation }) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SixthStepValues>();

  let discForm = watch('formOfDiscrimination');
  let otherForm = watch('otherForm');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (discForm?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }
  }, [discForm]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SixthStepValues> = (data) => {};
  return (
    <div className="lg:w-[35rem]">
      <FormHeader
        title={sixthStepTranslation?.title}
        subTitle={sixthStepTranslation?.description}
      />
      {sixthStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('formOfDiscrimination', { required: true })}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
      {(discForm && discForm?.includes('Anderes, und zwar')) ||
      (discForm && discForm?.includes('Other, specify')) ? (
        <InputField
          name=""
          placeholder=""
          props={register('otherForm', { required: true })}
          title=""
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default SixthStep;
