import { FC } from 'react';

type Props = {
  name: string;
  setName: (value: string) => void;
  positionNumber: number[];
  setpositionNumber: (value: number) => void;
  handleClick: () => void;
};

const Component: FC<Props> = ({ name, setName, positionNumber, setpositionNumber, handleClick }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>備品の名前</span>
          <input
            type='text'
            className='w-1/2 rounded-lg p-1'
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>配置場所</span>
          <select className='w-1/2 rounded-lg p-1' onChange={(e) => setpositionNumber(Number(e.target.value))}>
            {positionNumber.map((num) => {
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
        </div>
        <div className='flex justify-end items-center w-8/12 rounded-lg'>
          <button className='w-1/2 rounded-lg p-2 bg-blue-400 text-white' onClick={handleClick}>
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
