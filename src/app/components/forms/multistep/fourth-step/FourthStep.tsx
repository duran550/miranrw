import React, { useEffect, useState } from 'react';
import 'dayjs/locale/de';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FourthFormValues } from './fourthStep';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { THIRD_FORM } from '@/cookies/cookies.d';
import { DatePicker, ConfigProvider } from 'antd';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
// Date Picker
const { RangePicker } = DatePicker;
type FourthStepProps = {
  fourthStepTranslation: { title: string; description: string };
};

const FourthStep: React.FC<FourthStepProps> = ({ fourthStepTranslation }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(dayjs());
  const [question] = useState<string>(fourthStepTranslation?.title);
  const [dateRange, setDateRange] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FourthFormValues>();

  let datePeriod: string = watch('datePeriod');

  // Getting form cookies
  let formValues: {
    datePeriod: string;
    question: string;
    dateRange: string;
    valueDate: any;
    dateRangeState: any;
  } = getFormCookies(THIRD_FORM);

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    // dispatch({ type: FORM_ERRORS, payload: false });
    if (datePeriod && !dateRange) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // Setting default values if exists in cookies

    if (formValues && !datePeriod) {
      datePeriod !== formValues?.datePeriod &&
        setValue('datePeriod', formValues?.datePeriod);

      formValues?.valueDate && setValueDate(dayjs(formValues?.valueDate));

      dispatch({ type: FORM_ERRORS, payload: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.valueDate, formValues?.datePeriod, datePeriod, dateRange]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FourthFormValues> = (data) => {
    let dateRangeState = dateRange;

    let dataWithDate = { valueDate, dateRangeState, ...data };
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...dataWithDate };
    setFormCookies(dataWithQuestion, THIRD_FORM);

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  // Handle default value

  function disabledDate(current: any) {
    // Disable dates after today
    return current && current.isAfter(dayjs().endOf('day'));
  }

  // On range picker change
  function onDateRangeChange(date: any, dateString: any) {
    setDateRange(date);
  }

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
          <LocalizationProvider adapterLocale="de" dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{
                width: '100%',
                '& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover':
                  {
                    backgroundColor: `#463980 !important`,
                  },
              }}
              value={valueDate}
              defaultValue={valueDate}
              disabled={datePeriod ? true : false}
              maxDate={dayjs()}
              views={['year', 'month', 'day']}
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
          <div className="mt-2 mb-8">
            <RangePicker
              onChange={onDateRangeChange}
              disabledDate={disabledDate}
              defaultValue={
                formValues?.dateRangeState && [
                  dayjs(formValues?.dateRangeState[0]),
                  dayjs(formValues?.dateRangeState[1]),
                ]
              }
              className="w-full py-3 border border-gray-300"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default FourthStep;
