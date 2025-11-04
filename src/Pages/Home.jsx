import React from 'react';

import { Navigate } from 'react-router';
import Newsletter from '../Components/Shared/Newsletter';

const Home = () => {
    return (
        <div>
            <Navigate to="/categories/0"></Navigate>
            
        </div>
    );
};

export default Home;