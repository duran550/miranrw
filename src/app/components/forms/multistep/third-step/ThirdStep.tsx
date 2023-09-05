import React from 'react';
import SelectField from '../../select-field/SelectField';
import TextArea from '../../text-area/TextArea';

const ThirdStep = () => {
  return (
    <div>
      <div className="py-4">
        <SelectField
          title={
            'Handelt es sich noch um eine weitere Form der Diskriminierung ?'
          }
          name={''}
          options={[]}
          props={undefined}
        />
      </div>
      <div className="py-4">
        <TextArea
          props={undefined}
          name={''}
          placeholder={''}
          title={
            'Welche Auswirkungen hatte der Vorfall für dich (z.B. emotionale, körperliche, soziale oder finanzielle Auswirkungen'
          }
        />
      </div>
      <div className="py-4">
        <SelectField
          title={'Hast du bereits andere MaBnahmen ergriffen ?'}
          name={''}
          options={[]}
          props={undefined}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
