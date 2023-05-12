import { FC } from 'react';
import DeskTable from '../molecules/DeskTable';
import Desk from '../../types/desk';
import CallOrder from '../../types/callOrder';
import Classroom from '../../types/classroom';
import Placement from '../../types/placement';

import { useRouter } from 'next/router';

type Props = {
  classroom: Classroom;
  desks?: Desk[];
  call_orders?: CallOrder[];
  placements?: Placement[];
  reverse: boolean;
};

const ClassroomTable: FC<Props> = ({ desks, call_orders, classroom, placements, reverse }) => {
  let positions: any = [];
  let seat_number = 1;
  for (let i = 1; i <= classroom.breadth; i++) {
    if (classroom.gaps.includes(i)) {
      if (placements && placements.filter((placement) => placement.positionNumber === i).length !== 0) {
        positions.push(placements.filter((placement) => placement.positionNumber === i)[0]);
      } else {
        positions.push({ seatNumber: 0 });
      }
    } else {
      if (desks && desks.filter((desk) => desk.seatNumber === seat_number).length !== 0) {
        positions.push(desks.filter((desk) => desk.seatNumber === seat_number)[0]);
      } else {
        positions.push({ seatNumber: seat_number });
      }
      seat_number++;
    }
  }

  if (!reverse) positions.reverse();

  // 8人ずつに分割
  let split_positions = [];
  for (let i = 0; i < positions.length; i += classroom.split) {
    split_positions.push(positions.slice(i, i + classroom.split));
  }

  // statusがfalseのものを抽出
  let shaping_call_orders = call_orders?.filter((call) => !call.status || call.today).reverse();

  return (
    <main className='w-full h-full px-12 flex justify-center flex-col items-center'>
      {reverse && <div className='h-12 w-28 bg-white flex items-center justify-center text-xl'>出入口</div>}
      <div className='bg-white w-full h-full'>
        <table className='h-full w-full'>
          <tbody className='h-full w-full flex'>
            {split_positions.map((row, index) => (
              <tr className='w-1/6 h-full grid grid-row-8' key={index}>
                {row.map(
                  (seat: any, row_index: number) =>
                    shaping_call_orders
                      ?.filter((call) => call.seatNumber === seat.seatNumber)
                      .map((call) => (
                        <DeskTable
                          key={row_index}
                          connect={index % 2 === 1}
                          seat_number={seat.seatNumber}
                          name={call.student?.name}
                          turn_num={
                            shaping_call_orders &&
                            shaping_call_orders.findIndex((call) => call.seatNumber === seat.seatNumber) + 1
                          }
                          status={call.status}
                          today={call.today}
                        />
                      ))[0] || (
                      <DeskTable
                        key={row_index}
                        connect={index % 2 === 1}
                        seat_number={seat.seatNumber}
                        name={seat.student?.name || seat.name}
                        turn_num={0}
                        status={true}
                      />
                    ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!reverse && <div className='h-12 w-28 bg-white flex items-center justify-center text-xl'>出入口</div>}
    </main>
  );
};

export default ClassroomTable;
