import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import RadioGroup from '../../radio/RadioGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../checkbox/Checkbox';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import InputField from '../../text-field/InputField';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { EIGTH_FORM, ELEVENTH_STEP, NINETH_FORM, SEVENTH_FORM, TENTH_FORM } from '@/cookies/cookies.d';
import { NinethFormValues, NinethStepProps } from './ninethStep';
import SeventhStep from '../seventh-step/SeventhStep';

const NinethStep: React.FC<NinethStepProps> = ({
  ninethStepTranslation,
  id,
}) => {

  const { dispatch, isEditing, reportingPerson, formErrors, id_, formValue } = useFormContext();
  const [question] = useState<string>(ninethStepTranslation?.title);

  // useEffect(()=>{
  //   if (formValue && formValue!=='') {
  //     id_ === 'eighthForm'
  //       ? setFormCookies(formValue, EIGTH_FORM)
  //       : setFormCookies(formValue, SEVENTH_FORM);

  //       console.log(formValue, 'valueeeeeeeeeee');
        
  //   }
  // },[])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<NinethFormValues>();

  let haveYouReported: string = watch('haveYouReported');
  let haveYouReportedYes: string[] = watch('haveYouReportedYes');
  let haveYouReportedYesFreeField1: string = watch(
    'haveYouReportedYesFreeField1'
  );
  let haveYouReportedYesFreeField2: string = watch(
    'haveYouReportedYesFreeField2'
  );

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
   
    dispatch({ type: FORM_ERRORS, payload: false });
    // Getting values from the form
    let formValues: {
      haveYouReported: string;
      haveYouReportedYes: string[];
      haveYouReportedYesFreeField1: string;
      haveYouReportedYesFreeField2: string;
      question: string;
    } = 
    (reportingPerson == 'myself') ? 
    getFormCookies(ELEVENTH_STEP) : reportingPerson == 'andere' ? getFormCookies(TENTH_FORM) : getFormCookies(TENTH_FORM)

    // (reportingPerson == 'myself' || reportingPerson == 'andere')
    //          ? setFormCookies(dataWithQuestion, TENTH_FORM)
    //          : setFormCookies(dataWithQuestion, EIGTH_FORM);

    dispatch({ type: FORM_ERRORS, payload: true });

    //   Setting values in the fields
    if (haveYouReported === ninethStepTranslation?.data?.options[2]?.value) {
      dispatch({ type: FORM_ERRORS, payload: true });
      if (haveYouReported &&
        haveYouReportedYes?.length > 0 &&
        !haveYouReportedYes?.includes(
          ninethStepTranslation?.data?.optionsYes[4].value
        ) &&
        !haveYouReportedYes?.includes(
          ninethStepTranslation?.data?.optionsYes[3].value
        )
      ) {
        dispatch({ type: FORM_ERRORS, payload: false });
      } else {
        if (
          haveYouReported &&
          haveYouReportedYes?.length > 0 &&
          haveYouReportedYes?.includes(
            ninethStepTranslation?.data?.optionsYes[3].value
          )
        ) {
          dispatch({ type: FORM_ERRORS, payload: true });
          if (
            haveYouReportedYesFreeField1 &&
            haveYouReportedYesFreeField1.length > 2
          ) {
            dispatch({ type: FORM_ERRORS, payload: false });
          }
        } else if (
          haveYouReportedYes?.length > 0 &&
          haveYouReportedYes?.includes(
            ninethStepTranslation?.data?.optionsYes[4].value
          )
        ) {
          dispatch({ type: FORM_ERRORS, payload: true });
          if (
            haveYouReportedYesFreeField2 &&
            haveYouReportedYesFreeField2.length > 2
          ) {
            dispatch({ type: FORM_ERRORS, payload: false });
          }
        } else if (
          haveYouReportedYes?.length > 0 &&
          haveYouReportedYes?.includes(
            ninethStepTranslation?.data?.optionsYes[4].value
          ) &&
          haveYouReportedYes?.includes(
            ninethStepTranslation?.data?.optionsYes[3].value
          )
        ) {
          dispatch({ type: FORM_ERRORS, payload: true });
        
        }
      }
        if (!isValid) {
          dispatch({ type: FORM_ERRORS, payload: true });
        } else {
          dispatch({ type: FORM_ERRORS, payload: false });
        }

      

      // Clear field when no selected
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    if (formValues && !haveYouReported) {
      haveYouReported !== formValues.haveYouReported &&
        setValue('haveYouReported', formValues?.haveYouReported);

      haveYouReported !== formValues.haveYouReported &&
        setValue('haveYouReportedYes', formValues?.haveYouReportedYes);

      haveYouReportedYesFreeField1 !==
        formValues.haveYouReportedYesFreeField1 &&
        setValue(
          'haveYouReportedYesFreeField1',
          formValues?.haveYouReportedYesFreeField1
        );

      haveYouReportedYesFreeField2 !==
        formValues.haveYouReportedYesFreeField2 &&
        setValue(
          'haveYouReportedYesFreeField2',
          formValues?.haveYouReportedYesFreeField2
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(formValue, 'log00')
  }, [
    haveYouReported,
    haveYouReportedYes,
    haveYouReportedYesFreeField1,
    haveYouReportedYesFreeField2,
    isValid
  ]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<NinethFormValues> = (data) => {
      // let formValues: {
      //   formOfDisc: string;
      //   formOfDiscYes: string[];
      //   formOfDiscYesFreeField: string;
      //   question: string;
      // } = getFormCookies(EIGTH_FORM);

      // if (formValues) {
        // clearFormCookiesStep(EIGTH_FORM);
          let step = getFormStep();
           if (data.haveYouReported && data.haveYouReported.length < 5) {
            
             let dataWithQuestion = {
               question,
               step,
               haveYouReported: data.haveYouReported,
               haveYouReportedYes: [],
             };
             // dispatch({ type: ID_FORM, payload: id });
             //  dispatch({ type: FORM_VALUE, payload: dataWithQuestion });
             (reportingPerson == 'myself')
               ? setFormCookies(dataWithQuestion, ELEVENTH_STEP)
               : reportingPerson === 'andere' ? setFormCookies(dataWithQuestion, TENTH_FORM) : setFormCookies(dataWithQuestion, TENTH_FORM);
           } else {
            
             let dataWithQuestion = { question, step, ...data };
            //  id === 'tenthForm'
            (reportingPerson == 'myself')
               ? setFormCookies(dataWithQuestion, ELEVENTH_STEP)
               : reportingPerson === 'andere' ? setFormCookies(dataWithQuestion, TENTH_FORM) : setFormCookies(dataWithQuestion, TENTH_FORM);
           }
      
  
   dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });

    console.log(formValue, 'ninethstep')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // id={id === 'tenthForm' ? 'tenthForm' : 'eighthForm'}
      id={(reportingPerson == 'myself' || reportingPerson == 'andere') ? 'tenthForm' : 'ninethForm'}
      className="lg:w-[25rem]"
    >
      <div className=''>
        <FormHeader
          title={ninethStepTranslation?.title}
          subTitle={ninethStepTranslation?.description}
        />
      </div>
      <div>
        <RadioGroup
          options={ninethStepTranslation?.data?.options}
          props={register('haveYouReported')}
        />
        <div className="ml-8">
          {haveYouReported ===
            ninethStepTranslation?.data?.options[1]?.value && (
            <>
              {haveYouReported && (
                <p className="text-xs">{ninethStepTranslation?.mandatory}</p>
              )}
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[0]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[0]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[0]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[0]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[0]?.label}
                />
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[1]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[1]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[1]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[1]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[1]?.label}
                />
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[2]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[2]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[2]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[2]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[2]?.label}
                />
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[3]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[3]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[3]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[3]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[3]?.label}
                />
                {/* First freeText field */}
                {haveYouReported ===
                  ninethStepTranslation?.data?.options[1].value &&
                  haveYouReportedYes &&
                  haveYouReportedYes?.includes(
                    ninethStepTranslation?.data?.optionsYes[3].value
                  ) && (
                    <div className="lg:ml-16 mb-4">
                      <InputField
                        name="haveYouReportedYesFreeField1"
                        props={register('haveYouReportedYesFreeField1', {
                          required: true,
                          minLength: 3,
                        })}
                      />
                      <p className="text-xs my-4 text-red-600">
                        {haveYouReportedYesFreeField1 &&
                          haveYouReportedYesFreeField1.length < 3 &&
                          ninethStepTranslation?.minCharacters}
                      </p>
                    </div>
                  )}
              </div>
              <div>
                <Checkbox
                  key={ninethStepTranslation?.data?.optionsYes[4]?.iD}
                  id={ninethStepTranslation?.data?.optionsYes[4]?.id}
                  name={ninethStepTranslation?.data?.optionsYes[4]?.name}
                  props={register('haveYouReportedYes', { required: true })}
                  value={ninethStepTranslation?.data?.optionsYes[4]?.value}
                  label={ninethStepTranslation?.data?.optionsYes[4]?.label}
                />
              </div>
            </>
          )}

          {/* Second freeText field */}

          {haveYouReported ===
            ninethStepTranslation?.data?.options[1].value&&haveYouReportedYes &&
            haveYouReportedYes?.includes(
              ninethStepTranslation?.data?.optionsYes[4].value
            ) && (
              <div className="lg:ml-16">
                <InputField
                  name="haveYouReportedYesFreeField2"
                  props={register('haveYouReportedYesFreeField2', {
                    required: true,
                    minLength: 3,
                  })}
                />
                <p className="text-xs my-4 text-red-600">
                  {haveYouReportedYesFreeField2 &&
                    haveYouReportedYesFreeField2.length < 3 &&
                    ninethStepTranslation?.minCharacters}
                </p>
              </div>
            )}
        </div>
      </div>
    </form>
  );
};

export default NinethStep;
