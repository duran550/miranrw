import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import InputField from '../../text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FourthFormValues } from './fourthStep';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { THIRD_FORM } from '@/cookies/cookies.d';

type FourthStepProps = {
  fourthStepTranslation: { title: string; description: string };
};

const FourthStep: React.FC<FourthStepProps> = ({ fourthStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing } = useFormContext();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(dayjs());
  const [question] = useState<string>(fourthStepTranslation?.title);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FourthFormValues>();

  let datePeriod: string = watch('datePeriod');
  let dateRange = watch('dateRange');

  // Getting form cookies
  let formValues: {
    datePeriod: string;
    question: string;
    dateRange: string;
    valueDate: any;
  } = getFormCookies(THIRD_FORM);

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    if (!dateRange && datePeriod) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // Setting default values if exists in cookies

    if (formValues) {
      datePeriod !== formValues?.datePeriod &&
        setValue('datePeriod', formValues?.datePeriod);

      dateRange !== formValues?.dateRange &&
        setValue('dateRange', formValues?.dateRange);

      formValues?.valueDate && setValueDate(dayjs(formValues?.valueDate));

      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, formValues?.valueDate, formValues?.dateRange]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FourthFormValues> = (data) => {
    let dataWithDate = { valueDate, ...data };
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...dataWithDate };
    setFormCookies(dataWithQuestion, THIRD_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="thirdForm"
      className="flex flex-col relative"
    >
      <div className="lg:w-[35rem]">
        <FormHeader
          title={fourthStepTranslation?.title}
          subTitle={fourthStepTranslation?.description}
        />
        <div className="border border-primaryColor rounded-md">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{ '&.MuiPickersPopper-root': { border: '4px solid red' } }}
              value={valueDate}
              defaultValue={valueDate}
              disabled={datePeriod ? true : false}
              onChange={(newValue) => setValueDate(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="mt-4 lg:absolute lg:-right-[40rem]">
        <Checkbox
          props={register('datePeriod')}
          name="datePeriod"
          value="Es ist über einen längeren Zeitraum passiert."
          label="Es ist über einen längeren Zeitraum passiert."
          id="datePeriod"
        />

        {datePeriod && (
          <div className="ml-4">
            <InputField
              name="dateRange"
              placeholder=""
              props={register('dateRange', { required: true })}
              title=""
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default FourthStep;
