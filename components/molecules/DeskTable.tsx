import { FC } from 'react';

type Props = {
  num: number;
  name?: string;
  connect?: boolean;
  turn_num?: number;
};

const DeskTable: FC<Props> = ({ num, name, connect=false, turn_num }) => {
  return (
    num === 0 && name === '' ? (
      <td className="h-full row-span-1 text-xl">&nbsp;</td>
    ) : (
      <td className="w-full h-full row-span-1">
        {
          !connect ? (
            <div className="w-full h-full flex">
              <div className={`w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative text-xs ${turn_num ? 'bg-green-200' : ''}`}>
                {
                  name ? name : <>&nbsp;</>
                }
                <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-700'>
                  { turn_num ? turn_num : '' }
                </p>
              </div>
              <div className="w-2/12">
                <p className="text-left">
                  {
                    num === 0 ? <>&nbsp;</> : num
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex">
              <div className="w-2/12">
                <p className="text-right">
                  {
                    num === 0 ? <>&nbsp;</> : num
                  }
                </p>
              </div>
              <div className="w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative text-xs">
                <div>
                  {
                    name ? name : <>&nbsp;</>
                  }
                </div>

                <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>
                  { turn_num ? turn_num : '' }
                </p>
              </div>
            </div>
          )
        }
      </td>
    )
  )
};

export default DeskTable;