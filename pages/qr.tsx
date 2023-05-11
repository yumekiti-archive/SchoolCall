import React, { FC, useState } from 'react';

const QRCodeGenerator: FC = () => {
  // http://localhost/student/qr?classroomName=3601&seatNumber=6

  const [classroomName, setClassroomName] = useState('');
  const [volumeNumber, setVolumeNumber] = useState(1);
  const [paths, setPaths] = useState<string[]>([]);

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
            <input type="text" value={classroomName} onChange={(e) => setClassroomName(e.target.value)} />
          </div>
          <div>
            <label className='mr-6'>生成数</label>
            <input type="number" value={volumeNumber} onChange={handleVolumeNumber} />
          </div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleGenerate}>
          生成
        </button>
      </div>
      <div className='mt-4 flex flex-wrap'>
        {paths.map((path) => (
          <div key={path} className='m-4'>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${path}`} />
            <p>{path}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodeGenerator;