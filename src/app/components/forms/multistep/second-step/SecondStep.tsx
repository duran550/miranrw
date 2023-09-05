import { DatePicker } from 'antd';
import React, { useState } from 'react';
import InputField from '../../text-field/InputField';
import SelectField from '../../select-field/SelectField';
import TextArea from '../../text-area/TextArea';

const SecondStep = () => {
  const [date, setDate] = useState<Date>(new Date());

  function onChange(date: any, dateString: any) {
    setDate(date);
  }
  return (
    <div className="h-full">
      <div className="flex flex-col">
        <div className="mb-3 text-md font-bold">Datum</div>
        <DatePicker className="w-full py-3" onChange={onChange} />
      </div>
      <div className="my-4">
        <InputField name="" title="Ort" placeholder="Kôln" />
      </div>
      <div className="py-4">
        <SelectField
          name=""
          options={[]}
          title="In welchem Bereich fand die Diskrimnierung statt ?"
          props={''}
        />
      </div>
      <div className="my-4">
        <TextArea
          title="Vorfallsbeschreibung - Was genau ist passiert ?"
          props={''}
          name=""
          placeholder="Bitte beschreibe den Vorfall so genau wie möglich"
        />
      </div>
      <div className="py-4">
        <SelectField
          name=""
          options={[]}
          title="Hatte eines dieser Merkmale deiner Meinung nach einen Einfluss auf die Diskriminierung"
          props={''}
        />
      </div>
      <div className="my-4">
        <SelectField
          name=""
          options={[]}
          title="Um welche Form von Queerfeindlichkeit handelt es sich deiner Meinung nach ?"
          props={''}
        />
      </div>
    </div>
  );
};

export default SecondStep;
