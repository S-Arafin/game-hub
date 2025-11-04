import React from 'react';
import Header from '../Components/Shared/Header';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main className='w-11/12 mx-auto p-20'>
            <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;