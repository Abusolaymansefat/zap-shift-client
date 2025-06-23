import React from 'react';
import logo from '../../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-end p-5'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-3xl -ml-3 font-extrabold'>Profast</p>
        </div>
    );
};

export default ProFastLogo;