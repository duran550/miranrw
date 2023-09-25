import React from 'react';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

type FourthStepProps = {
  fourthStepTranslation: { title: string; description: string };
};

const FourthStep: React.FC<FourthStepProps> = ({ fourthStepTranslation }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <div className="lg:w-[28rem]">
      <FormHeader
        title={fourthStepTranslation?.title}
        subTitle={fourthStepTranslation?.description}
      />
      <div className="border border-primaryColor rounded-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{ '&.MuiPickersPopper-root': { border: '4px solid red' } }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default FourthStep;
