import { FC } from 'react';

type Props = {
  classroomName: string;
  setClassroomName: (classroomName: string) => void;
  seatNumber: number;
  setSeatNumber: (seatNumber: number) => void;
  handleClick: () => void;
};

const Component: FC<Props> = ({ classroomName, setClassroomName, seatNumber, setSeatNumber, handleClick }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 h-3/6 md:w-1/2 md:h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
          <span>教室名</span>
          <input
            type='text'
            className='w-1/2 rounded-lg p-1'
            min='1'
            defaultValue={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
          />
        </div>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
          <span>座席番号</span>
          <input
            type='number'
            className='w-1/2 rounded-lg p-1'
            min='1'
            defaultValue={seatNumber}
            onChange={(e) => setSeatNumber(Number(e.target.value))}
          />
        </div>
        <div className='flex justify-end items-center w-8/12 rounded-lg'>
          <button className='w-1/4 rounded-lg p-2 bg-blue-400 text-white text-center' onClick={handleClick}>
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
