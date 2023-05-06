import React, { FC } from 'react';

type Props = {
  message: string;
  type?: string;
};

const Alert: FC<Props> = ({ message, type = 'orange' }) => {
  return (
    <div className={`bg-${type}-100 border-l-4 border-${type}-500 text-${type}-700 p-4`} role="alert">
      <p>{message}</p>
    </div>
  );
}

export default Alert