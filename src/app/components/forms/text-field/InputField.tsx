import React from 'react';

type InputFieldProps = {
  props?: any;
  name: string;
  placeholder?: string;
  title?: string;
  change?:any
};

const InputField: React.FC<InputFieldProps> = ({
  props,
  title,
  name,
  placeholder,
  change
}) => {
  return (
    <>
      {change ? (
        <>
          {' '}
          <label className="block mb-4 mt-6 text-sm" htmlFor={name}>
            {title}
          </label>
          <input
            className="appearance-none border rounded-md w-full py-3 px-3 leading-tight border-gray-300  focus:outline-none focus:border-primaryColor focus:bg-white text-gray-700 pr-16"
            id={name}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            autoFocus
            name={name}
            {...props}
            onChange={change}
          />
        </>
      ) : (
        <>
          {' '}
          <label className="block mb-4 mt-6 text-sm" htmlFor={name}>
            {title}
          </label>
          <input
            className="appearance-none border rounded-md w-full py-3 px-3 leading-tight border-gray-300  focus:outline-none focus:border-primaryColor focus:bg-white text-gray-700 pr-16"
            id={name}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            autoFocus
            name={name}
            {...props}
          />
        </>
      )}
    </>
  );
};

export default InputField;
