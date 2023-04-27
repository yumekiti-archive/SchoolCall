import { ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='w-screen h-screen bg-gray-300'>
      <div className='w-full h-full flex flex-col'>
        <header className='h-12 bg-white flex items-center'>
          <div className='text-xl ml-4'>
            座席表
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;