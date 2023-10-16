import { FC } from 'react';

type Props = {
  name: string;
  setName: (name: string) => void;
  className: string;
  setClassName: (className: string) => void;
  studentNumber: number;
  setStudentNumber: (studentNumber: number) => void;
  attendanceNumber: number;
  setAttendanceNumber: (attendanceNumber: number) => void;
  handleClick: () => void;
};

const Component: FC<Props> = ({
  name,
  setName,
  className,
  setClassName,
  studentNumber,
  setStudentNumber,
  attendanceNumber,
  setAttendanceNumber,
  handleClick,
}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 h-3/6 md:w-1/2 md:h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>名前</span>
          <input
            type='text'
            className='w-1/2 rounded-lg p-1'
            placeholder='山田 太郎'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>クラス名</span>
          <input
            type='text'
            className='w-1/2 rounded-lg p-1'
            placeholder='IE3A'
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>学籍番号</span>
          <input
            type='number'
            className='w-1/2 rounded-lg p-1'
            min='1'
            placeholder='2200000'
            onChange={(e) => setStudentNumber(Number(e.target.value))}
          />
        </div>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
          <span>出席番号</span>
          <input
            type='number'
            className='w-1/2 rounded-lg p-1'
            min='1'
            placeholder='1'
            onChange={(e) => setAttendanceNumber(Number(e.target.value))}
          />
        </div>
        <div className='flex justify-end items-center w-8/12 rounded-lg'>
          <button className='w-1/2 rounded-lg p-2 bg-blue-400 text-white' onClick={handleClick}>
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
