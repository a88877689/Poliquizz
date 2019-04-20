import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import Home from '@/components/Home/Home';
import Listing from '@/containers/Quizz/Listing';

const layout = (props) => {
    return (
        <Router className='golem-container'>
            <header className='golem-header'>
                <Navbar />
            </header>

            <div className='golem-content'>
                <Sidebar />

                <main className='golem-main-view'>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/quizz/listing' exact component={Listing} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default layout;