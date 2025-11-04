import React from 'react';

const Loader = () => {
  return (
    
    <div className="flex justify-center items-center h-[40rem]">
      
      <div>
        <h1 className='text-4xl md:text-8xl text-secondary font-bold'>L<span className="loading loading-spinner w-[90px] h-[100px]"></span>AD<span className='text-primary'>!</span>NG</h1>
      </div>

    </div>
  );
};

export default Loader;