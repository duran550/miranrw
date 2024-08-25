// import React from 'react';

// type TextAreaProps = {
//   props?: any;
//   name: string;
//   placeholder: string;
//   title?: string;
//   type: string;
//   val?: string;
//   handleChange?: any;
//   className?: string;
// };

// const TextArea: React.FC<TextAreaProps> = ({
//   props,
//   name,
//   title,
//   placeholder,
//   val,
//   handleChange,
//   className,
// }) => {
//   const defaultClassName = `block p-2.5 w-full text-sm text-gray-900 border border-[red]`;
//   // focus:border border focus:border-primaryColor border-primaryColor
//   const combinedClassName = className
//     ? `${defaultClassName} ${className}`
//     : defaultClassName;

//   return (
//     <>
//       <label
//         htmlFor={name}
//         className="block mb-3 text-sm font-bold text-gray-900 "
//       >
//         {title}
//       </label>
//       <textarea
//         id={placeholder}
//         rows={6}
//         name={name}
//         {...props}
//         value={val}
//         // onChange={handleChange}
//         className={`${combinedClassName} focus:border-[red] focus:border-2`}
//         placeholder={placeholder}
//       ></textarea>
//     </>
//   );
// };

// export default TextArea;


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
  const defaultClassName = `block p-2.5 w-full text-sm text-gray-900 border border-[red] focus:outline-none focus:border-2 focus:border-[red] placeholder-gray-500 focus:placeholder-[red] h-full`;

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
        onChange={handleChange}
        className={`${combinedClassName} rounded-lg`}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default TextArea;
