import * as React from 'react';

import Navbar from '../src/components/Navbar';
import Todos from '../src/components/Todos/Todos';

const Dashboard = () => {
    return (
        <div>

            <Navbar />

            <Todos />

        </div>
    )
}

export default Dashboard
