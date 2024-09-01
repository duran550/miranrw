import { useCallback, useContext, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import addIcone from '.././../../../../public/item.svg';
import delIcone from '.././../../../../public/item (1).svg';
import Image from 'next/image';
import { CategorizeContext } from '@/app/context/CategorizeContext';

const CardCategory: React.FC<{ text: string, indice: string, id: string, deleHandler: (id:string)=>void }> = ({indice,text, id, deleHandler}) => {
  const [show, setShow] = useState(false);
  const {
   fillArraySave,
    arrayReportAndCategory,
   arraySave,
    fillReportCategory
  } = useContext(CategorizeContext);
console.log(id);

  return (
    <div
      className="relative "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div
          className="absolute flex gap-[2px] left-0 -top-[22px] "
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
         
          <Image
            src={delIcone}
            alt=""
            className="cursor-pointer"
            
            onClick={() => {
              // let id: string;
             deleHandler(id)
           }}
          />
        </div>
      )}
      <div
        className={`flex items-center gap-2 px-1 min-w-[200px] max-w-[300px] rounded-lg min-h-[46px] border-l-[6px] bg-white  
        ${
          indice == 'level1'
            ? 'border-firstCat'
            : indice == 'level2'
              ? 'border-secondCat'
              : 'border-thirdCat'
        }`}
      >
        <span
          className={` w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${
            indice == 'level1'
              ? 'bg-firstCat'
              : indice == 'level2'
                ? 'bg-secondCat'
                : 'bg-thirdCat'
          }`}
        >
          {indice == 'level1' && '1'}
          {indice == 'level2' && '2'}
          {indice == 'level3' && '3'}
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};
export default CardCategory;
