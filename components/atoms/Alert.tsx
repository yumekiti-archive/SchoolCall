import React, { FC } from 'react';

type Props = {
  message: string;
  type?: string;
};

const colors = [
  {
    type: 'success',
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-700',
  },
  {
    type: 'error',
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-700',
  },
];

const Alert: FC<Props> = ({ message, type = 'error' }) => {
  const color: any = colors.filter((color) => color.type === type)[0];

  return (
    <div className={`${color.bg} border-l-4 ${color.border} ${color.text} p-4`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
