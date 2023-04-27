import { FC } from 'react';
import DeskTable from '../molecules/DeskTable';

import { desks, calls } from '../../seeder/data';

const ClassRoom: FC = () => {
  // 8人ずつに分割
  let shaping_desks = [];
  for (let i = 0; i < desks.length; i += 8) {
    shaping_desks.push(desks.slice(i, i + 8));
  }

  return (
    <main className='w-full h-full px-12 flex justify-center flex-col items-center'>
      <div className='h-12 w-28 bg-white flex items-center justify-center text-xl'>
        入口
      </div>
      <div className='bg-white w-full h-full'>
        <table className='h-full w-full'>
          <tbody className='h-full w-full flex'>
            {shaping_desks.map((row, index) => (
              <tr className='w-1/6 h-full grid grid-row-8' key={index}>
                {row.map(
                  (seat, row_index) =>
                    calls
                      .filter((call) => call.seat_number === seat.seat_number)
                      .map((call) => (
                        <DeskTable
                          key={row_index}
                          connect={index % 2 === 1}
                          seat_number={seat.seat_number}
                          name={call.student.name}
                          turn_num={1}
                        />
                      ))[0] || (
                      <DeskTable
                        key={row_index}
                        connect={index % 2 === 1}
                        seat_number={seat.seat_number}
                        name={seat.name}
                      />
                    ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ClassRoom;
