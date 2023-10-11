import React, { useEffect } from 'react';
import { FourthStepOrganizationProps } from './fourthStepOrganization';
import FormHeader from '../header/header';
import RadioGroup from '../../radio/RadioGroup';
import { FourthStepOrganizationFormValues } from './fourthStepOrganization';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';

const FourthStepOrganization: React.FC<FourthStepOrganizationProps> = ({
  fourthStepOrganizationTranslation,
}) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FourthStepOrganizationFormValues>();

  let numberOfEmployes = watch('numberOfEmployees');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (numberOfEmployes) {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfEmployes]);

  return (
    <div className="flex flex-col relative">
      <div className="lg:w-[35rem]">
        <FormHeader
          title={fourthStepOrganizationTranslation?.title}
          subTitle={fourthStepOrganizationTranslation?.subTitle}
        />
        <div className="">
          <RadioGroup
            options={fourthStepOrganizationTranslation?.data}
            props={register('numberOfEmployees')}
            title=""
          />
        </div>
      </div>
      <div className="mt-4 lg:absolute lg:-right-[40rem]"></div>
    </div>
  );
};

export default FourthStepOrganization;
