import React from 'react';

type TextAreaProps = {
  props: any;
  name: string;
  placeholder: string;
  title: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  props,
  name,
  title,
  placeholder,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-3 text-sm font-bold text-gray-900 "
      >
        {title}
      </label>
      <textarea
        id={placeholder}
        rows={4}
        name={name}
        {...props}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default TextArea;
