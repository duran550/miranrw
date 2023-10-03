import React, { useEffect } from 'react';
import FormHeader from '../header/header';
import { EightStepProps, EightFormValues } from './eightStep.d';
import RadioGroup from '../../radio/RadioGroup';
import { useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';
import InputField from '../../text-field/InputField';

const EightStep: React.FC<EightStepProps> = ({ eightStepTranslation }) => {
  const { dispatch } = useFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EightFormValues>();

  let formOfDisc: string = watch('formOfDisc');
  let formOfDiscYes: string[] = watch('formOfDiscYes');
  let formOfDiscYesFreeField: string = watch('formOfDiscYesFreeField');

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (formOfDisc) {
      dispatch({ type: FORM_ERRORS, payload: false });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOfDisc]);

  return (
    <form className="lg:w-[35rem]">
      <FormHeader title={eightStepTranslation?.title} />
      <div>
        <RadioGroup
          options={eightStepTranslation?.data?.options}
          props={register('formOfDisc')}
          title=""
        />
        <div className="ml-8">
          {formOfDisc === 'Ja, und zwar:' &&
            eightStepTranslation?.data?.optionsYes?.map((element: any) => (
              <Checkbox
                key={element?.iD}
                id={element?.id}
                name={element?.name}
                props={register('formOfDiscYes')}
                value={element?.value}
                label={element?.label}
              />
            ))}

          <div className="ml-4">
            {formOfDiscYes && formOfDiscYes?.includes('Anderes, und zwar:') && (
              <InputField name="" props={register('formOfDiscYesFreeField')} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EightStep;
