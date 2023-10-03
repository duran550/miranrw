import React, { useEffect } from 'react';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS } from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import InputField from '../../text-field/InputField';
import { useForm } from 'react-hook-form';
import { FourthFormValues } from './fourthStep';

type FourthStepProps = {
  fourthStepTranslation: { title: string; description: string };
};

const FourthStep: React.FC<FourthStepProps> = ({ fourthStepTranslation }) => {
  const { dispatch } = useFormContext();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(dayjs());

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FourthFormValues>();

  let datePeriod: string = watch('datePeriod');
  let dateRange = watch('dateRange');

  console.log(dayjs(valueDate));

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: false });

    if (!dateRange && datePeriod) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else {
      dispatch({ type: FORM_ERRORS, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, datePeriod]);

  return (
    <div className="flex flex-col relative">
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
    </div>
  );
};

export default FourthStep;
