import React, { useEffect, useRef, useState } from 'react';

type CheckboxProps = {
  name: string;
  id: any;
  value?: string;
  label?: string;
  checked?: boolean;
  props: any;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  id,
  value,
  label,
  checked,
  props,
}) => {
  return (
    <div key={id} className="p-4">
      <div className="flex items-center mr-4 mb-2">
        <input
          key={id}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          {...props}
          className="opacity-0 absolute h-3 w-3"
        />
        <div className="bg-white border border-grey w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            className="fill-current hidden w-3 h-3 text-primaryColor pointer-events-none"
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490 490"
          >
            <polygon
              points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	489.292,457.678 277.331,245.004 489.292,32.337"
            />
          </svg>
        </div>
        <label htmlFor={id} className="select-none">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;

// import React from 'react';

// type RadioSingleProps = {
//   id: number;
//   props: any;
//   value?: string;
//   label: string;
//   name: string;
// };

// const RadioSingle: React.FC<RadioSingleProps> = ({
//   name,
//   id,
//   label,
//   props,
//   value,
// }) => {
//   return (
//     <div key={id} className="flex items-center">
//       <input
//         {...props}
//         id={`${id}`}
//         type="checkbox"
//         value={value}
//         name={name}
//         className={` w-6 h-6 text-primaryColor bg-gray-100 focus:ring-PrimaryColor  dark:ring-offset-gray-800 focus:ring-2`}
//       />
//       {label && (
//         <label
//           htmlFor={id.toString()}
//           className="w-full py-3 ml-4 text-sm font-medium text-gray-900 "
//         >
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

// export default RadioSingle;
