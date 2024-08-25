import React, { useEffect, useState } from 'react';
import 'dayjs/locale/de';
import locale from 'antd/es/date-picker/locale/de_DE';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FourthFormValues } from './fourthStep';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FIFTH_FORM, THIRD_FORM } from '@/cookies/cookies.d';
import { DatePicker } from 'antd';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import InputField from '../../text-field/InputField';
// Date Picker
const { RangePicker } = DatePicker;
type FourthStepProps = {
  fourthStepTranslation: {
    title: string;
    description: string;
    happenedOverALongPeriod: string;
    mandatory: string;
    forgetful: string;
    selectYear: string;
    yearitHappened: string;
  };
  id?: string;
};

const FourthStep: React.FC<FourthStepProps> = ({
  fourthStepTranslation,
  id,
}) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(null);
  const [question] = useState<string>(fourthStepTranslation?.title);
  const [dateRange, setDateRange] = useState<any>();
  const [checked, setChecked] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError, clearErrors
  } = useForm<FourthFormValues>();

  let datePeriod: string = watch('datePeriod');
  let forgetful: string = watch('forgetful')
  let forgetfulFreeField: string = watch('forgetfulFreeField')
  let yearitHappened: string = watch('yearitHappened')
  let formValues: {
    datePeriod: string;
    question: string;
    dateRange: string;
    valueDate: any;
    dateRangeState: any;
    forgetful: string;
    forgetfulFreeField: string;
    yearitHappened: string;
  } = {
    datePeriod: '',
    question: '',
    dateRange: '',
    valueDate: '',
    dateRangeState: '',
    forgetful: '',
    forgetfulFreeField: '',
    yearitHappened: '',
  };
  // Getting form cookies
  // alert(id)
  // if (id && id === 'fifthForm') {
  //   formValues = getFormCookies(FIFTH_FORM);
  // } else {
  //   formValues = getFormCookies(THIRD_FORM);

  // }

  (reportingPerson === 'myself' || reportingPerson === 'organization')
    ? formValues = getFormCookies(FIFTH_FORM)
    : formValues = getFormCookies(THIRD_FORM);

  // dispatch({ type: FORM_ERRORS, payload: true });
  // Scroll on top

  useScrollOnTop();
  let check: any = datePeriod;

  useEffect(() => {
    if (check == false) {
      setChecked(0);
    }

    if (forgetful) {
      // setValue('yearitHappened', '')
      setValue('datePeriod', '')
    }

    if (datePeriod) {
      setValue('forgetful', '')
    }

    // yearitHappened && setValue('datePeriod', '')
    // datePeriod && setValue('yearitHappened', '')

    if (forgetfulFreeField) {
      const currentYear = new Date().getFullYear();
      const year = parseInt(forgetfulFreeField, 10);

      if (isNaN(year)) {
        setError('forgetfulFreeField', { type: 'manual', message: 'Please enter a valid number' });
      } else if (forgetfulFreeField.length !== 4) {
        setError('forgetfulFreeField', { type: 'manual', message: 'Year must be exactly 4 digits' });
      } else if (year < 1980 || year > currentYear) {
        setError('forgetfulFreeField', { type: 'manual', message: `Year must be between 1980 and ${currentYear}` });
      } else {
        clearErrors('forgetfulFreeField'); // Clear errors if valid
      }
    }

    console.log(errors.forgetfulFreeField, 'yearitHappened')
    // console.log(yearitHappenedFreeField?.length 
    //   == 4 && !!errors.yearitHappenedFreeField, 'yearitHappenedGreat')


    if (valueDate == null && !datePeriod) {

      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      if (datePeriod && !dateRange) {
        dispatch({ type: FORM_ERRORS, payload: true });
      } else {
        if (datePeriod && dateRange) {
          dispatch({ type: FORM_ERRORS, payload: false });
        }

        // dispatch({ type: FORM_ERRORS, payload: false });
      }
      if (valueDate && !datePeriod) {
        dispatch({ type: FORM_ERRORS, payload: false });
      }
      if (forgetful && forgetfulFreeField?.length < 4) {
        dispatch({ type: FORM_ERRORS, payload: true });
      }
    }
    // dispatch({ type: FORM_ERRORS, payload: false });
    // if (datePeriod && !dateRange) {
    //   dispatch({ type: FORM_ERRORS, payload: true });
    // } else {
    //    if (datePeriod && dateRange) {
    //      dispatch({ type: FORM_ERRORS, payload: false });
    //    }

    //   // dispatch({ type: FORM_ERRORS, payload: false });
    // }

    if (formValues) {
      if (checked == 0) {
        if (
          formValues.datePeriod &&
          formValues.dateRangeState &&
          formValues.dateRangeState.length > 0
        ) {
          // console.log(formValues.datePeriod, '------------');

          dispatch({ type: FORM_ERRORS, payload: false });

          // if (!dateRange) {
          //    setDateRange(formValues.dateRangeState)
          // }
        }
      } else if (yearitHappened && forgetfulFreeField?.length > 3) {
        dispatch({ type: FORM_ERRORS, payload: false });
      }
    }


    if (
      datePeriod !== undefined &&
      datePeriod != fourthStepTranslation?.happenedOverALongPeriod
    ) {
      setChecked(3);
      setDateRange(null);
    }


    if (formValues && datePeriod === undefined && !forgetfulFreeField && !forgetful && !yearitHappened) {
      // if (formValues) {
      forgetful !== formValues?.forgetful &&
        setValue('forgetful', formValues?.forgetful);

      formValues?.forgetfulFreeField &&
        setValue(
          'forgetfulFreeField',
          formValues?.forgetfulFreeField
        );

      formValues?.yearitHappened &&
        setValue(
          'yearitHappened',
          formValues?.yearitHappened
        );

      // if (formValues.datePeriod && formValues.datePeriod.length > 0 && formValues.forgetful && formValues.forgetfulFreeField.length > 0) {
      datePeriod !== formValues?.datePeriod &&
        setValue('datePeriod', formValues?.datePeriod);
      setDateRange(formValues.dateRangeState);
      setValueDate(null);
      // } else {
      formValues?.valueDate !== valueDate &&
        setValueDate(dayjs(formValues?.valueDate));
      // }
      //  dispatch({ type: FORM_ERRORS, payload: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePeriod, dateRange, valueDate, setValueDate, checked, forgetful, forgetfulFreeField, yearitHappened]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FourthFormValues> = (data) => {
    if (dateRange) {
      setValueDate(null);
    }

    let dateRangeState = dateRange;

    let dataWithDate = { valueDate, dateRangeState, ...data };
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...dataWithDate };

    // id && id === 'fifthForm'
    //   ? setFormCookies(dataWithQuestion, FIFTH_FORM)
    //   : setFormCookies(dataWithQuestion, THIRD_FORM);

    (reportingPerson === 'myself' || reportingPerson === 'organization')
      ? setFormCookies(dataWithQuestion, FIFTH_FORM)
      : setFormCookies(dataWithQuestion, THIRD_FORM);

    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  // Handle default value

  function disabledDate(current: any) {
    // Disable dates after today
    return current && current.isAfter(dayjs().endOf('day'));
  }

  // On range picker change
  function onDateRangeChange(date: any, dateString: any) {
    setDateRange(date);
    if (!date) {
      setChecked(1);

      dispatch({ type: FORM_ERRORS, payload: true });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // id={id === 'fifthForm' ? 'fifthForm' : 'thirdForm'}
      id={(reportingPerson === 'myself' || reportingPerson === 'organization') ? 'fifthForm' : 'thirdForm'}
      className="flex flex-col xl:w-[25rem]"
    >
      <div className="">
        {/* <div className='lg:w-[31rem]'>
          <FormHeader
            title={fourthStepTranslation?.title}
            subTitle={fourthStepTranslation?.description}
            mandatory={fourthStepTranslation.mandatory}
          />
        </div> */}
        <div>
          <div className=''>
            <FormHeader
              title={fourthStepTranslation?.title}
              subTitle={fourthStepTranslation?.description}
              mandatory={fourthStepTranslation.mandatory}
            />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-22 xl:w-[54vw]'>
            <div className="border border-primaryColor rounded-md mb-4">
              <LocalizationProvider adapterLocale="de" dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{
                    width: '100%',
                    '& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover':
                    {

                      backgroundColor: `#F81A1A !important`,
                      // backgroundColor: `#463980 !important`,
                    },
                  }}
                  value={valueDate}
                  // defaultValue={valueDate}
                  disabled={datePeriod || forgetful || yearitHappened ? true : false}
                  maxDate={dayjs()}
                  views={['year', 'month', 'day']}
                  onChange={(newValue) => setValueDate(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className=''>
              {
                <div>
                  <Checkbox
                    props={register('datePeriod')}
                    name="datePeriod"
                    value={fourthStepTranslation?.happenedOverALongPeriod}
                    label={fourthStepTranslation?.happenedOverALongPeriod}
                    id="datePeriod"
                  />
                  {datePeriod && (
                    <div className="mt-2 mb-8">
                      <RangePicker
                        locale={locale}
                        onChange={onDateRangeChange}
                        disabled={forgetful ? true : false}
                        disabledDate={disabledDate}
                        defaultValue={
                          dateRange !== null && formValues?.dateRangeState
                            ? [
                              dayjs(formValues?.dateRangeState[0]),
                              dayjs(formValues?.dateRangeState[1]),
                            ]
                            : null
                        }
                        className="w-full py-3 border border-gray-300 ml-14"
                      />
                    </div>
                  )}
                </div>
              }
              {/* <div className={`${datePeriod ? 'mt-40': 'mt-20'} xl:absolute xl:-right-[30rem] 2xl:-right-[46.2rem]`}> */}
              <div className=''>
                <Checkbox
                  props={register('forgetful')}
                  name="forgetful"
                  value={fourthStepTranslation?.forgetful}
                  label={fourthStepTranslation?.forgetful}
                  id="forgetful"
                />
              </div>
              <div className=''>
                {/* <Checkbox
                  props={register('yearitHappened')}
                  name="yearitHappened"
                  value={fourthStepTranslation?.yearitHappened}
                  label={fourthStepTranslation?.yearitHappened}
                  id="yearitHappened"
                /> */}
                {forgetful &&
                  // <div className='ml-8'>
                  //   <InputField
                  //     name="yearitHappenedFreeField"
                  //     placeholder={fourthStepTranslation.selectYear}
                  //     props={register('yearitHappenedFreeField', {
                  //       required: true,
                  //     })}
                  //     title=""
                  //   />
                  // </div>

                  <div className='ml-14'>
                    <h1>{fourthStepTranslation.yearitHappened}</h1>
                    <InputField
                      name="forgetfulFreeField"
                      placeholder={fourthStepTranslation.selectYear}
                      props={register('forgetfulFreeField', {
                        required: 'Year is required'
                      })}
                      title=""
                      type='number'
                    />
                    {errors.forgetfulFreeField && (
                      <p className="error-text text-red-800 font-semibold">{errors.forgetfulFreeField.message}</p>
                    )}
                  </div>

                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-4 xl:absolute xl:-right-[30rem] 2xl:-right-[40rem]"> */}
    </form>
  );
};

export default FourthStep;
