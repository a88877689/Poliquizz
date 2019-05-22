import React from 'react';
import { Link }  from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sidebar = () => {
    return (
        <nav className='golem-sidebar'>
            <ul className='golem-sidenav'>
                <li className='golem-sidenav__item'>
                    <Link to='/' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='home' className='golem-sidenav__icon' />
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link to='/quizz' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='question-circle' className='golem-sidenav__icon' />
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link to='/exams' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='pencil-ruler' className='golem-sidenav__icon' />
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link to='/documentation' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='file-alt' className='golem-sidenav__icon' />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default sidebar;