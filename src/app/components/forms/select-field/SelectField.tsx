import React from 'react';

type SelectFieldProps = {
  title: string;
  name: string;
  options: Array<string>;
  props: any;
};

const SelectField: React.FC<SelectFieldProps> = ({
  title,
  options,
  name,
  props,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-3 text-sm font-bold text-gray-900"
      >
        {title}
      </label>
      <select
        name={name}
        {...props}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options?.map((option: any) => (
          <option key={option?.id} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;
