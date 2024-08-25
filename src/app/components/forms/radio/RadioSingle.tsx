import React from 'react';

type RadioSingleProps = {
  id: string;
  props: any;
  value: string;
  label: string;
  name: string;
  disabled?:boolean;
};

const RadioSingle: React.FC<RadioSingleProps> = ({
  name,
  id,
  label,
  props,
  value,
  disabled
}) => {
  return (
    <div key={id} className="flex items-center pl-4 ">
      <input
        {...props}
        id={`${id}`}
        type="radio"
        value={value}
        name={name}
        className={`w-6 h-6 text-primaryColor bg-gray-100 accent-primaryColor focus:ring-primaryColor`}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={id}
          className="w-full py-3 ml-4 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioSingle;



// import React from 'react';

// type RadioSingleProps = {
//   id: string;
//   props: any;
//   value: string;
//   label: string;
//   name: string;
//   disabled?: boolean;
// };

// const RadioSingle: React.FC<RadioSingleProps> = ({
//   name,
//   id,
//   label,
//   props,
//   value,
//   disabled,
// }) => {
//   return (
//     <div key={id} className="flex items-center pl-4">
//       <input
//         {...props}
//         id={`${id}`}
//         type="radio"
//         value={value}
//         name={name}
//         className={`w-6 h-6 text-primaryColor bg-gray-100 accent-primaryColor focus:ring-primaryColor`}
//         disabled={disabled}
//       />
//       {label && (
//         <label
//           htmlFor={id}
//           className="w-full py-3 ml-4 text-sm font-medium text-gray-900"
//         >
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

// export default RadioSingle;
