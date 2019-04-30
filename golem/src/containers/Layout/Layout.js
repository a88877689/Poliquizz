import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Documentation from '@/components/Documentation/Documentation';
import Home from '@/components/Home/Home';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Create, Update, Listing } from '@/containers/Quizz/index';

const layout = (props) => {
    return (
        <div className='golem-container'>
            <header className='golem-header'>
                <Navbar />
            </header>

            <div className='golem-content'>
                <Sidebar />

                <main className='golem-main-view'>
                    <Switch>
                        <Route path='/documentation' component={Documentation} />
                        <Route path='/quizz/create' component={Create} />
                        <Route path='/quizz/edit/:id' component={Update}/>
                        <Route path='/quizz' component={Listing} exact />
                        <Route path='/' exact component={Home} />
                        <Route path='*' component={Home} />
                    </Switch>
                </main>
            </div>
        </div>
    );
}

export default layout;