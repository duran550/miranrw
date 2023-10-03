import React, { useEffect } from 'react';
import RadioGroup from '../../radio/RadioGroup';
import FormHeader from '../header/header';
import { SecondFormValues, SecondStepProps } from './secondStep';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, REPORTING_PERSON } from '@/app/context/actions';

const SecondStep: React.FC<SecondStepProps> = ({ secondStepTranslation }) => {
  const { dispatch, reportingPerson } = useFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SecondFormValues>();

  let identity: string = watch('identity');

  useEffect(() => {
    // Check if field is selected and throw an error if not
    if (!identity) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
      dispatch({
        type: REPORTING_PERSON,
        payload:
          identity === secondStepTranslation?.options[0].value
            ? 'myself'
            : identity === secondStepTranslation?.options[1].value
            ? 'andere'
            : identity === secondStepTranslation?.options[2].value
            ? 'onBehalf'
            : 'organization',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  return (
    <div className="relative flex flex-col">
      <form id="firstForm" className="h-full lg:w-[35rem]">
        <FormHeader title={secondStepTranslation?.title} />
        <RadioGroup
          props={register('identity', { required: true })}
          options={secondStepTranslation?.options}
          title=""
        />
      </form>
      {identity === secondStepTranslation?.options[2].value && (
        <div className="mt-4 max-w-lg lg:absolute lg:mt-0 lg:-right-[40rem]">
          <FormHeader
            title={secondStepTranslation?.onBehalfHints?.title}
            subTitle={secondStepTranslation?.onBehalfHints?.description}
          />
        </div>
      )}
    </div>
  );
};

export default SecondStep;
