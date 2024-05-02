import React from 'react';

type TextAreaProps = {
  props?: any;
  name: string;
  placeholder: string;
  title?: string;
  type: string;
  val?: string;
  handleChange?: any;
  className?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  props,
  name,
  title,
  placeholder,
  val,
  handleChange,
  className,
}) => {
  const defaultClassName = `block p-2.5 w-full text-sm text-gray-900 border border-[red] focus:ring-[red]`;
  // focus:border border focus:border-primaryColor border-primaryColor
  const combinedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

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
        rows={6}
        name={name}
        {...props}
        value={val}
        // onChange={handleChange}
        className={combinedClassName}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default TextArea;
