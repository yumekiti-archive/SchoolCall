import { FC } from 'react';
import CallOrder from '@/types/callOrder';

type Props = {
  call_orders: CallOrder[];
  handleCheck: (call_order_id: number, check: boolean) => void;
  handleComplete: (call_order_id: number) => void;
  handleToday: (call_order_id: number, today: boolean) => void;
};

const Component: FC<Props> = ({ call_orders, handleCheck, handleComplete, handleToday }) => {
  return (
    <>
      <div className='flex justify-center items-center my-4'>
        <button className='w-11/12 bg-blue-400 hover:bg-blue-300 text-white font-bold py-6 px-4 rounded' onClick={() => location.reload()}>
          更新
        </button>
      </div>
      {call_orders && call_orders.length !== 0 ? (
        call_orders.map((call_order) => (
          <div
            key={call_order.id}
            className={`shadow-md rounded-md p-4 m-4
            ${!call_order.check && !call_order.today ? 'bg-white' : ''}
            ${!call_order.today && call_order.check ? 'bg-yellow-100' : ''}
            ${call_order.today ? 'bg-green-100' : ''}
            `}
          >
            <div className='flex justify-between items-center grid grid-row-2 grid-cols-1 sm:flex'>
              <div className='text-lg font-bold row-span-1 flex items-center justify-center mb-2 sm:mb-0'>
                <span>{call_order.student?.className}</span>
                <span className='ml-2 border-l-2 pl-2 w-36 truncate'>{call_order.student?.name} さん</span>
                <span className='ml-2 border-l-2 pl-2'>出席番号 {call_order.student?.attendanceNumber}</span>
              </div>
              <div className='flex justify-end items-center row-span-1'>
                <button
                  className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4'
                  onClick={() => handleCheck(call_order.id, call_order.check)}
                >
                  確認中
                </button>
                <button
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4'
                  onClick={() => handleToday(call_order.id, call_order.today)}
                >
                  課題完了
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleComplete(call_order.id)}
                >
                  確認完了
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>現在呼び出し中の生徒はいません</div>
      )}
    </>
  );
};

export default Component;
