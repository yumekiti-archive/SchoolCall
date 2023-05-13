import { FC } from 'react';
import Link from 'next/link';

type Props = {
  studentNumber: number;
  setStudentNumber: (studentNumber: number) => void;
  handleClick: () => void;
};

const Component: FC<Props> = ({ studentNumber, setStudentNumber, handleClick }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 h-3/6 md:w-1/2 md:h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
        <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
          <span>学籍番号</span>
          <input
            type='number'
            className='w-1/2 rounded-lg p-1'
            min='1'
            max='100'
            defaultValue={studentNumber}
            onChange={(e) => setStudentNumber(Number(e.target.value))}
          />
        </div>
        <div className='flex justify-end items-center w-8/12 rounded-lg'>
          <Link href={'/student/signup'} className='w-1/4 rounded-lg p-2 bg-green-400 text-white text-center'>
            登録
          </Link>
          <button className='w-1/4 rounded-lg p-2 bg-blue-400 text-white ml-2' onClick={handleClick}>
            認証
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
