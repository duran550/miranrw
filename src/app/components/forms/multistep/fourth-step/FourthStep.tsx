import React from 'react';
import FormHeader from '../header/header';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const FourthStep = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <div>
      <FormHeader
        title="Wann fand der Vorfall statt?"
        subTitle="Bitte wähle ein Datum aus. Falls es sich um einen längeren Zeitraum handelt, kannst du auch diesen auch auswählen"
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
