import React from 'react';

type RadioGroupProps = {
    name: string;
    id: string;
    value: string;
    label?: string;
    checked?: boolean;
    props: any;
};

const RadioGroupOuterMap: React.FC<RadioGroupProps> = ({name,
    id,
    value,
    label,
    checked,
    props}) => {

  return (
    <div key={id} className="p-4">
      <div className="flex items-center mr-4 mb-2">
        <input
          key={id}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          {...props}
         className="w-6 h-6 text-primaryColor bg-gray-100 focus:ring-PrimaryColor  dark:ring-offset-gray-800 focus:ring-2 "
        />
        <label htmlFor={id} className="select-none ml-2">
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioGroupOuterMap;
