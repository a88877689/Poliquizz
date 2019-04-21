import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import Home from '@/components/Home/Home';
import Listing from '@/containers/Quizz/Listing';

const layout = (props) => {
    return (
        <div className='golem-container'>
            <header className='golem-header'>
                <Navbar />
            </header>

            <div className='golem-content'>
                <Sidebar />

                <main className='golem-main-view'>
                    <div className='golem-main-view-container'>
                        <Switch>
                            <Route path='/quizz/listing' component={Listing} />
                            <Route path='/' exact component={Home} />
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default layout;