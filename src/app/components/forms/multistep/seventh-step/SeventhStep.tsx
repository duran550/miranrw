import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import FormHeader from '../header/header';
import InputField from '../../text-field/InputField';

type SeventhStepProps = {
  seventhStepTranslation: {
    title: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

type SeventhStepValues = {
  typeOfDiscrimination: string[];
  otherForm: string;
};

const SeventhStep: React.FC<SeventhStepProps> = ({
  seventhStepTranslation,
}) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SeventhStepValues>();

  let typeOfDiscrimination = watch('typeOfDiscrimination');
  let otherForm = watch('otherForm');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (typeOfDiscrimination?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }
  }, [typeOfDiscrimination]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<SeventhStepValues> = (data) => {};
  return (
    <div className="lg:w-[35rem]">
      <FormHeader
        title={seventhStepTranslation?.title}
        subTitle={seventhStepTranslation?.description}
      />
      {seventhStepTranslation?.choices?.map((choice: any) => (
        <Checkbox
          key={choice.iD}
          props={register('typeOfDiscrimination', { required: true })}
          name={choice.name}
          id={choice.id}
          value={choice.value}
          label={choice.label}
        />
      ))}
      {(typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Anderes, und zwar')) ||
      (typeOfDiscrimination &&
        typeOfDiscrimination?.includes('Other, specify')) ? (
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

export default SeventhStep;
