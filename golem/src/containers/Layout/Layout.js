import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Documentation from '@/components/Documentation/Documentation';
import Home from '@/components/Home/Home';
import Navbar from '@/components/Navbar/Navbar';
import ResponsiveSidebar from '@/components/Sidebar/ResponsiveSidebar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { CreateQuizz, UpdateQuizz, ListingQuizz } from '@/containers/Quizz/index';
import { CreateExam, UpdateExam, ListingExam } from '@/containers/Exam/index';

class Layout extends Component {
    render() {
        let sidebar = null;
        if(window.screen.width <= 800) {            
            sidebar = (<ResponsiveSidebar />);
        } else {
            sidebar = (<Sidebar />);
        }
        
        return (
            
            <div className='golem-container'>
                <header className='golem-header'>
                    <Navbar />
                </header>

                <div className='golem-content'>
                    { sidebar }

                    <main className='golem-main-view'>
                        <Switch>
                            <Route path='/documentation' component={Documentation} />
                            <Route path='/quizz/create' component={CreateQuizz} />
                            <Route path='/quizz/update/:id' component={UpdateQuizz}/>
                            <Route path='/quizz' component={ListingQuizz} exact />
                            <Route path='/exams/create' component={CreateExam} exact />
                            <Route path='/exams/update/:id' component={UpdateExam} exact />
                            <Route path='/exams' component={ListingExam} exact />
                            <Route path='/' exact component={Home} />
                            <Route path='*' component={Home} />
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default Layout;