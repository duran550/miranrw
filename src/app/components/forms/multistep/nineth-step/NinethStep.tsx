import React, { useEffect } from 'react';
import FormHeader from '../header/header';
import { NinethStepProps, NinethFormValues } from './ninethStep.d';
import RadioGroup from '../../radio/RadioGroup';
import { useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';
import InputField from '../../text-field/InputField';

const NinethStep: React.FC<NinethStepProps> = ({ ninethStepTranslation }) => {
  const { dispatch, reportingPerson } = useFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NinethFormValues>();

  let gender: string[] = watch('gender');
  let sexualOrientation: string[] = watch('sexualOrientation');
  let validation = watch('validation');
  let sexualOrientationFreeField: string[] = watch(
    'sexualOrientationFreeField'
  );
  let age: string = watch('age');
  let genderFreeField: string = watch('genderFreeField');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (validation?.length !== 0) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation]);

  return (
    <form className="lg:w-[35rem]">
      {reportingPerson !== 'organization' && (
        <>
          <h1 className="font-bold text-3xl mb-4">
            {ninethStepTranslation?.mainTitle}
          </h1>
          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.firstBlock?.titleOnBehalf
                  : ninethStepTranslation?.firstBlock?.title
              }
            />
            <div className="-mt-8">
              {ninethStepTranslation?.firstBlock?.data?.map((element: any) => (
                <Checkbox
                  key={element?.iD}
                  id={element?.id}
                  name={element?.name}
                  props={register('gender')}
                  value={element?.value}
                  label={element?.label}
                />
              ))}
              <div className="ml-4">
                {gender && gender?.includes('Selbstbezeichung:') && (
                  <InputField name="" props={register('genderFreeField')} />
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.secondBlock?.titleOnBehalf
                  : ninethStepTranslation?.secondBlock?.title
              }
            />
            <div className="-mt-8">
              {ninethStepTranslation?.secondBlock?.data?.map((element: any) => (
                <Checkbox
                  key={element?.iD}
                  id={element?.id}
                  name={element?.name}
                  props={register('sexualOrientation')}
                  value={element?.value}
                  label={element?.label}
                />
              ))}

              <div className="ml-4">
                {sexualOrientation &&
                  sexualOrientation?.includes('Selbstbezeichung:') && (
                    <InputField
                      name=""
                      props={register('sexualOrientationFreeField')}
                    />
                  )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FormHeader
              title={
                reportingPerson !== 'myself'
                  ? ninethStepTranslation?.thirdBlock?.titleOnBehalf
                  : ninethStepTranslation?.thirdBlock?.title
              }
            />
            <div className="-mt-8">
              {
                <RadioGroup
                  options={ninethStepTranslation?.thirdBlock?.data}
                  props={register('age')}
                  title=""
                />
              }
            </div>
          </div>
        </>
      )}

      <div className="mt-8">
        <FormHeader title={ninethStepTranslation?.fourthBlock?.title} />
        <div className="-mt-8">
          {ninethStepTranslation?.fourthBlock?.data?.map((element: any) => (
            <Checkbox
              key={element?.iD}
              id={element?.id}
              name={element?.name}
              props={register('validation')}
              value={element?.value}
              label={element?.label}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default NinethStep;
