import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import addIcone from '.././../../../../public/item.svg';
import delIcone from '.././../../../../public/item (1).svg';
const Level3Node: React.FC<{ data: any }> = ({ data }) => {
  const [value, setValue] = useState(data?.label);
    const [show, setShow] = useState(false);
  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, []);
  console.log('data', data);
  return (
    <div
      className="relative border"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: ' #43AA8B',
          border: '1px solid #43AA8B',
        }}
      />
      {show && (
        <div
          className="absolute flex gap-[2px] left-0 -top-[22px]"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {/* <Image src={addIcone} alt="" className="cursor-pointer" /> */}
          <Image
            src={delIcone}
            alt=""
            className="cursor-pointer"
            onClick={() => data.delete(data.ids)}
          />
        </div>
      )}
      <div className="flex items-center gap-2 pl-1 w-[195px] rounded-lg h-12 border-l-[6px] bg-white border-thirdCat ">
        <span className=" w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-thirdCat">
          3
        </span>
        <span className=" flex-grow w-24  flex items-center h-full text-xs">
          {value}
        </span>
        <input
          id="text"
          name="text"
          onChange={onChange}
          value={value}
          className="hidden flex-grow w-24   items-center h-full text-xs"
        />
      </div>
    </div>
  );
};
export default Level3Node;
