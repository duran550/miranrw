import React, { useEffect } from 'react';
import FormHeader from '../header/header';
import { FifthFormValues, FifthStepProps } from './FifthStep.d';
import RadioSingle from '../../radio/RadioSingle';
import InputField from '../../text-field/InputField';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation }) => {
  const { dispatch } = useFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FifthFormValues>();

  let locationOnline: string = watch('locationOnline');
  let location: string = watch('location');

  useEffect(() => {
    if (locationOnline || (location && !locationOnline)) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }
  }, [location, locationOnline]);

  return (
    <div className="lg:w-[35rem]">
      <FormHeader
        title={fifthStepTranslation?.title}
        subTitle={fifthStepTranslation?.description}
      />
      <div>
        <RadioSingle
          id={fifthStepTranslation?.firstOption?.id}
          label={fifthStepTranslation?.firstOption?.label}
          name="locationOnline"
          props={register('locationOnline')}
          value={fifthStepTranslation?.firstOption?.value}
        />
      </div>
      <div className="flex justify-between items-center space-x-4">
        <RadioSingle
          value="none"
          id={fifthStepTranslation?.secondOption.id}
          label=""
          name="locationOnline"
          props={''}
        />
        <div className="w-full">
          <InputField
            name=""
            placeholder=""
            props={register('location')}
            title=""
          />
        </div>
      </div>
    </div>
  );
};

export default FifthStep;
