import { FC } from 'react';
import DeskTable from '../molecules/DeskTable';

import { classroom, students } from '../../seeder/data'

const ClassRoom: FC = () => {
  // call_timeの順番でソートし前から3人を取り出す
  const turn = students.seat.filter((student) => student.call_time !== '').sort((a, b) => {
    if (a.call_time < b.call_time) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <main className='w-full h-full px-12 flex justify-center flex-col items-center'>
      <div className="h-12 w-28 bg-white flex items-center justify-center text-xl">
        入口
      </div>
      <div className="bg-white w-full h-full">
        <table className="h-full w-full">
          <tbody className="h-full w-full flex">
            {
              classroom.seat.map((row, index) => (
                <tr className="w-1/6 h-full grid grid-row-8" key={index}>
                  {
                    row.map((seat, row_index) => (
                      students.seat.filter((student) => student.num === seat.num).map((student) => (
                        <DeskTable key={row_index} connect={index % 2 === 1} num={seat.num} name={student.name} turn_num={turn.findIndex((turn_student) => turn_student.num === student.num) + 1} />
                      ))[0] ||
                      <DeskTable key={row_index} connect={index % 2 === 1} num={seat.num} name={seat.name} />
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  )
};

export default ClassRoom;