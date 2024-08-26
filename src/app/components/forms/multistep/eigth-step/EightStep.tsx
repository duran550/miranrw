import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { EightStepProps, EightFormValues } from './eightStep.d';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP, FORM_VALUE, ID_FORM } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { EIGTH_FORM, NINETH_FORM, SEVENTH_FORM, TENTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';

const EightStep: React.FC<EightStepProps> = ({ eightStepTranslation, id }) => {
  const { dispatch, isEditing, reportingPerson, formErrors, formValue } = useFormContext();
  const [question] = useState<string>(eightStepTranslation?.title);

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

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // Getting values from the form
    let formValues: {
      formOfDisc: string;
      formOfDiscYes: string[];
      formOfDiscYesFreeField: string;
      question: string;
    } = (reportingPerson === 'myself') ? getFormCookies(TENTH_FORM) : reportingPerson === 'organization' ? getFormCookies(NINETH_FORM) : getFormCookies(NINETH_FORM)
    
    
    // getFormCookies(NINETH_FORM)
    // if(reportingPerson === 'organization') {
    //   formValues = getFormCookies(EIGTH_FORM);
    // }

    dispatch({ type: FORM_ERRORS, payload: false });

    if (formOfDisc &&  formOfDisc === eightStepTranslation?.data?.options[1].value) {
      dispatch({ type: FORM_ERRORS, payload: true });
      if (
        formOfDiscYes?.length > 0 &&
        formOfDiscYes?.includes(eightStepTranslation?.data?.optionsYes[9].value)
      ) {
        dispatch({ type: FORM_ERRORS, payload: true });
        if (formOfDiscYesFreeField?.length >= 4) {
          dispatch({ type: FORM_ERRORS, payload: false });
        }
      }

       if (
         formOfDiscYes?.length > 0 &&
         !formOfDiscYes?.includes(
           eightStepTranslation?.data?.optionsYes[9].value
         )
       ) {
         dispatch({ type: FORM_ERRORS, payload: false });
       }
      // Clear field when no selected
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // Reset checkboxes

    if (
      formValues &&
      !formOfDisc &&
      !formOfDiscYes &&
      !formOfDiscYesFreeField
    ) {
      dispatch({ type: FORM_ERRORS, payload: false });
      formOfDisc !== formValues?.formOfDisc &&
        setValue('formOfDisc', formValues?.formOfDisc);
      formOfDiscYes !== formValues?.formOfDiscYes &&
        setValue('formOfDiscYes', formValues?.formOfDiscYes);
      formOfDiscYesFreeField !== formValues?.formOfDiscYesFreeField &&
        setValue('formOfDiscYesFreeField', formValues?.formOfDiscYesFreeField);
    }

    // {
    //   formOfDisc === 'Ja, und zwar:' &&
    //     dispatch({ type: FORM_ERRORS, payload: true });
    // }
    // {
    //   formOfDisc === 'Ja, und zwar:' &&
    //     formOfDiscYes?.length > 0 &&
    //     !formOfDiscYes?.includes('Anderes, und zwar:') &&
    //     dispatch({ type: FORM_ERRORS, payload: false });
    // }

    // if (formOfDiscYesFreeField?.length >= 4) {
    //   dispatch({ type: FORM_ERRORS, payload: false });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOfDiscYes, formOfDiscYesFreeField, formOfDisc]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<EightFormValues> = (data) => {
    //  let formValues: {
    //    formOfDisc: string;
    //    formOfDiscYes: string[];
    //    formOfDiscYesFreeField: string;
    //    question: string;
    //  } = getFormCookies(SEVENTH_FORM);

    //  if (formValues) {
    //   clearFormCookiesStep(SEVENTH_FORM)
    //  }

    if (data.formOfDisc &&  data.formOfDisc.length<5) {

         let step = getFormStep();
         let dataWithQuestion = {
           question,
           step,
           formOfDisc: data.formOfDisc,
           formOfDiscYes:[],
         };

         console.log(dataWithQuestion, 'log03')
         console.log(reportingPerson, 'reportingperson')
         // dispatch({ type: ID_FORM, payload: id });
         dispatch({ type: FORM_VALUE, payload: dataWithQuestion });
          // id === 'ninethForm'
          //   ? setFormCookies(dataWithQuestion, NINETH_FORM)
          //   : setFormCookies(dataWithQuestion, SEVENTH_FORM);
          if(reportingPerson === 'organization') {
            setFormCookies(dataWithQuestion, NINETH_FORM)
           } else if(reportingPerson === 'myself') {
            setFormCookies(dataWithQuestion, TENTH_FORM)
          } else {
            setFormCookies(dataWithQuestion, NINETH_FORM)
          }
    }else{
       let step = getFormStep();
       let dataWithQuestion = { question, step, ...data };
       // dispatch({ type: ID_FORM, payload: id });
       dispatch({ type: FORM_VALUE, payload: dataWithQuestion });
       if(reportingPerson === 'organization') {
        setFormCookies(dataWithQuestion, NINETH_FORM)
       } else if(reportingPerson === 'myself') {
        setFormCookies(dataWithQuestion, TENTH_FORM)
      } else {
        setFormCookies(dataWithQuestion, NINETH_FORM)
      }
    }
     

     dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    console.log(formValue, 'eightstep')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // id={id === 'ninethForm' ? 'ninethForm' : 'seventhForm'}
      id={(reportingPerson === 'myself' || reportingPerson === 'andere') ? 'ninethForm' : 'eighthForm'}
      className="lg:w-[25rem]"
    >
      <div className=''>
        <FormHeader title={eightStepTranslation?.title} subTitle={eightStepTranslation.subTitle}/>
      </div>

      <div>
        <RadioGroup
          options={eightStepTranslation?.data?.options}
          props={register('formOfDisc')}
        />
        <div className="ml-8">
          {formOfDisc === eightStepTranslation?.data?.options[1].value && (
            <p className="text-xs">{eightStepTranslation?.mandatory}</p>
          )}
          {formOfDisc === eightStepTranslation?.data?.options[1].value &&
            eightStepTranslation?.data?.optionsYes?.map((element: any) => (
              <Checkbox
                key={element?.name}
                id={element?.id}
                name={element?.name}
                props={register('formOfDiscYes')}
                value={element?.value}
                label={element?.label}
              />
            ))}

          <div className="ml-4">
            {formOfDisc &&  formOfDisc === eightStepTranslation?.data?.options[1].value &&  formOfDiscYes &&
              formOfDiscYes?.includes(
                eightStepTranslation?.data?.optionsYes[9].value
              ) && (
                <div className="w-full pb-4 ">
                  {' '}
                  <InputField
                    name="formOfDiscYesFreeField"
                    props={register('formOfDiscYesFreeField', {
                      required: true,
                      minLength:4
                    })}
                  />
                  {formOfDiscYes?.length > 0 &&
                    formOfDiscYes?.includes(
                      eightStepTranslation?.data?.optionsYes[9].value
                    ) &&
                    formErrors &&
                    formOfDiscYesFreeField?.length <4  && (
                      <label className="text-red-500 text-xs pb-3">
                        {eightStepTranslation?.minCharacters}
                      </label>
                    )}
                </div>
              )}
            {/* <div>
              {formOfDiscYes?.length > 0 &&
                formOfDiscYes?.includes(
                  eightStepTranslation?.data?.optionsYes[9].value
                ) &&
                formErrors &&
                formOfDiscYesFreeField?.length !== 0 && (
                  <label className="text-red-500 text-xs">
                    {eightStepTranslation?.minCharacters}
                  </label>
                )}
            </div> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EightStep;