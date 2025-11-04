import React from 'react';
import Header from '../Components/Shared/Header';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';

const Account = () => {
    return (
        <div>
            <Header></Header>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Account;