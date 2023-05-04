import { ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
  Title: string;
};

const Layout: FC<Props> = ({ children, Title }) => {
  return (
    <div className='w-screen h-screen bg-gray-300'>
      <div className='w-full h-full flex flex-col'>
        <header className='h-12 bg-white flex items-center'>
          <div className='text-xl ml-4'>{Title}</div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
