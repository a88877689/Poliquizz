import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

const layout = (props) => {
    return (
        <Router className='golem-container'>
            <header className='golem-header'>
                <Navbar />
            </header>

            <div className='golem-content'>
                <Sidebar />

                <main className='golem-main-view'></main>
            </div>
        </Router>
    );
}

export default layout;