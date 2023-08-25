import React from 'react';

type InputFieldProps = {
  props?: any;
  name: string;
  placeholder?: string;
  title?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  props,
  title,
  name,
  placeholder,
}) => {
  return (
    <>
      <label
        className="font-medium block mb-1 mt-6 text-gray-700"
        htmlFor={name}
      >
        {title}
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
        id={name}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        autoFocus
        name={name}
        {...props}
      />
    </>
  );
};

export default InputField;
