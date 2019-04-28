import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Documentation from '@/components/Documentation/Documentation';
import Home from '@/components/Home/Home';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Create, Listing } from '@/containers/Quizz/index';

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
                            <Route path='/documentation' component={Documentation} />
                            <Route path='/quizz/create' component={Create} />
                            <Route path='/quizz' component={Listing} exact />
                            <Route path='/' exact component={Home} />
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default layout;