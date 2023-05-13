const LoadingComponent = () => {
  return (
    <div className='flex justify-center items-center w-full h-full fixed top-0 left-0 bg-gray-200 bg-opacity-50 z-50'>
      <div className='animate-rotate-center h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent'></div>
    </div>
  );
};

export default LoadingComponent;
