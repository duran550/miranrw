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
// Date Picker
const { RangePicker } = DatePicker;
type FourthStepProps = {
  fourthStepTranslation: {
    title: string;
    description: string;
    happenedOverALongPeriod: string;
    mandatory: string;
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
  } = useForm<FourthFormValues>();

  let datePeriod: string = watch('datePeriod');
  let formValues: {
    datePeriod: string;
    question: string;
    dateRange: string;
    valueDate: any;
    dateRangeState: any;
  } = {
    datePeriod: '',
    question: '',
    dateRange: '',
    valueDate: '',
    dateRangeState: '',
  };
  // Getting form cookies
  // alert(id)
 if (id && id === 'fifthForm') {
   formValues = getFormCookies(FIFTH_FORM);
 } else {
   formValues = getFormCookies(THIRD_FORM);

 }
  // dispatch({ type: FORM_ERRORS, payload: true });
  // Scroll on top
  useScrollOnTop();
let check: any = datePeriod;
  useEffect(() => {
    if (check == false) {
      setChecked(0);
    }

   

  
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
      }
    
    }
  

    if (
      datePeriod !== undefined &&
      datePeriod != fourthStepTranslation?.happenedOverALongPeriod
    ) {
     
      setChecked(3);

      setDateRange(null);
    
    }
   

    if (formValues && datePeriod === undefined) {
    

      if (formValues.datePeriod && formValues.datePeriod.length > 0) {
        datePeriod !== formValues?.datePeriod &&
          setValue('datePeriod', formValues?.datePeriod);
        setDateRange(formValues.dateRangeState);
        setValueDate(null);
      } else {
        formValues?.valueDate !== valueDate &&
          setValueDate(dayjs(formValues?.valueDate));
      }

      //  dispatch({ type: FORM_ERRORS, payload: false });
    }

    // console.log(id, 'id');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePeriod, dateRange, valueDate, setValueDate, checked]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FourthFormValues> = (data) => {
    if (dateRange) {
      setValueDate(null);
    }

    let dateRangeState = dateRange;

    let dataWithDate = { valueDate, dateRangeState, ...data };
    let step = getFormStep();
    let dataWithQuestion = { question, step, ...dataWithDate };

   id && id === 'fifthForm'
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
      id={id === 'fifthForm' ? 'fifthForm' : 'thirdForm'}
      className="flex flex-col relative"
    >
      <div className="lg:w-[35rem]">
        <FormHeader
          title={fourthStepTranslation?.title}
          subTitle={fourthStepTranslation?.description}
        />
        <p className="text-sm -mt-12 mb-8">
          {fourthStepTranslation?.mandatory}
        </p>
        <div className="border border-primaryColor rounded-md mb-4">
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
              // defaultValue={valueDate}
              disabled={datePeriod ? true : false}
              maxDate={dayjs()}
              views={['year', 'month', 'day']}
              onChange={(newValue) => setValueDate(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="mt-4 xl:absolute xl:-right-[30rem] 2xl:-right-[40rem]">
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
              disabledDate={disabledDate}
              defaultValue={
                dateRange !== null && formValues?.dateRangeState
                  ? [
                      dayjs(formValues?.dateRangeState[0]),
                      dayjs(formValues?.dateRangeState[1]),
                    ]
                  : null
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
