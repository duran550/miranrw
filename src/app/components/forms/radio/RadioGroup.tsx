import React from 'react';

type RadioGroupProps = {
  options: Array<any>;
  title: string;
  props: any;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, title, props }) => {
  return (
    <>
      <div className="mb-3 font-bold">{title}</div>
      <div className="md:flex md:justify-between flex flex-col">
        {options?.map((radioElement) => (
          <div key={radioElement.id} className="flex items-center pl-4 ">
            <input
              {...props}
              id={`${radioElement?.id}`}
              type="radio"
              value={radioElement.value}
              name={radioElement.name}
              className="w-6 h-6 text-primaryColor bg-gray-100 focus:ring-PrimaryColor  dark:ring-offset-gray-800 focus:ring-2 "
            />
            <label
              htmlFor={radioElement.id}
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
            >
              {radioElement.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioGroup;
