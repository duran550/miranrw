import React from 'react';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';

type FifthStepProps = {
  fifthStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

type FifthStepValues = {
  formOfDiscrimination: string[];
  otherForm: string;
};

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation }) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FifthStepValues>();

  let discForm = watch('formOfDiscrimination');
  let otherForm = watch('otherForm');

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FifthStepValues> = (data) => {};
  return (
    <div className="lg:w-[28rem]">
      <FormHeader
        title={fifthStepTranslation?.title}
        subTitle={fifthStepTranslation?.description}
      />
      {fifthStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('formOfDiscrimination', { required: true })}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
      {discForm?.includes('Anderes, und zwar') ||
      discForm?.includes('Other, specify') ? (
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

export default FifthStep;
