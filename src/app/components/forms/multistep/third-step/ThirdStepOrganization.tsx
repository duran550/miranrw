import React, { useEffect } from 'react';
import {
  ThirdStepOrganizationFormValues,
  ThirdStepOrganizationProps,
} from './thirdStepOrganization';
import { useFormContext } from '@/app/hooks/useFormContext';
import { useForm } from 'react-hook-form';
import { FORM_ERRORS } from '@/app/context/actions';
import FormHeader from '../header/header';
import Checkbox from '../../checkbox/Checkbox';
import InputField from '../../text-field/InputField';

const ThirdStepOrganization: React.FC<ThirdStepOrganizationProps> = ({
  thirdStepOrganizationTranslation,
}) => {
  const { dispatch } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ThirdStepOrganizationFormValues>();

  let organizationType: string[] = watch('organizationType');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (organizationType?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationType]);

  console.log(organizationType);

  return (
    <div className="flex flex-col relative">
      <div className="lg:w-[35rem]">
        <FormHeader
          title={thirdStepOrganizationTranslation?.title}
          subTitle={thirdStepOrganizationTranslation?.subTitle}
        />
        <div className="">
          {thirdStepOrganizationTranslation?.data?.map((value: any) => (
            <Checkbox
              key={value?.iD}
              id={value?.id}
              name="organizationType"
              props={register('organizationType')}
              label={value?.label}
              value={value?.value}
            />
          ))}
          <div className="ml-4">
            {organizationType &&
              organizationType?.includes('Anderes, und zwar') && (
                <InputField
                  name="organizationTypeFreeField"
                  props={register('organizationTypeFreeField')}
                />
              )}
          </div>
        </div>
      </div>
      <div className="mt-4 lg:absolute lg:-right-[40rem]"></div>
    </div>
  );
};

export default ThirdStepOrganization;
