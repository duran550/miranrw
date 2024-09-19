import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import addIcone from '.././../../../../public/item.svg';
import delIcone from '.././../../../../public/item (1).svg';
const Level2Node: React.FC<{ data: any }> = ({ data }) => {
  const [value, setValue] = useState(data?.label);
    const [show, setShow] = useState(false);
  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, []);
  console.log('data123456', data);

  return (
    <div
      className="relative border"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{
          backgroundColor: ' #F36D38',
          border: '1px solid #F36D38',
          height: '9px',
          width: '9px',
        }}
      />
      {show && (
        <div
          className="absolute flex gap-[2px] left-0 -top-[22px]"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <Image
            src={addIcone}
            alt=""
            className="cursor-pointer"
            onClick={() => data.create(data.ids)}
          />
          <Image
            src={delIcone}
            alt=""
            className="cursor-pointer"
            onClick={() => data.delete(data.ids)}
          />
        </div>
      )}
      <div className="flex items-center gap-2 pl-1 w-[195px] rounded-lg h-12 border-l-[6px] bg-white border-secondCat ">
        <span className=" w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-secondCat">
          2
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
      <Handle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: ' #85C2FF',
          border: '1px solid #85C2FF',
        }}
      />
    </div>
  );
};
export default Level2Node;
