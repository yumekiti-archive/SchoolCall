import React, { FC, useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator: FC = () => {
  // http://localhost/student/qr?classroomName=3601&seatNumber=6

  const [classroomName, setClassroomName] = useState('3601');
  const [volumeNumber, setVolumeNumber] = useState(40);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState(128);

  const handleVolumeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeNumber(Number(e.target.value));
  };

  const handleGenerate = () => {
    if (!classroomName) return;
    const newPaths = [];
    for (let i = 1; i <= volumeNumber; i++) {
      newPaths.push(`${location.origin}/student/qr?classroomName=${classroomName}&seatNumber=${i}`);
    }
    setPaths(newPaths);
  };

  return (
    <div className='h-screen p-4'>
      <div className='bg-gray-300 p-4'>
        <div>
          <div>
            <label className='mr-6'>教室名</label>
            <input type='text' value={classroomName} onChange={(e) => setClassroomName(e.target.value)} />
          </div>
          <div>
            <label className='mr-6'>生成数</label>
            <input type='number' value={volumeNumber} onChange={handleVolumeNumber} />
          </div>
          <div>
            <label className='mr-6'>サイズ</label>
            <input type='number' value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </div>
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleGenerate}
        >
          生成
        </button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-4 flex flex-wrap justify-start'>
          {paths.map((path) => (
            <div key={path} className='m-4'>
              <QRCode value={path} style={{ width: size, height: size }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
