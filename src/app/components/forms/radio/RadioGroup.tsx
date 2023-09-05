import React from 'react';

type RadioGroupProps = {
  options: Array<any>;
  title: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, title }) => {
  return (
    <>
      <div className="mb-3 font-bold">{title}</div>
      <div className="md:flex md:justify-between flex flex-col">
        {options.map((radioElement) => (
          <div key={radioElement.id} className="flex items-center pl-4 ">
            <input
              id={`${radioElement?.id}`}
              type="radio"
              value={radioElement.value}
              name={radioElement.name}
              className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
            />
            <label
              htmlFor={radioElement.id}
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
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
