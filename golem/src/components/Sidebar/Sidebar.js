import React from 'react';
import { Link }  from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

library.add(faHome);

const sidebar = () => {
    return (
        <nav className='golem-sidebar'>
            <ul className='golem-sidenav'>
                <li className='golem-sidenav__item'>
                    <Link className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='home' className='golem-sidenav__icon' />
                        <span>Home</span>
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='home' className='golem-sidenav__icon' />
                        <span>Create Quizz</span>
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='home' className='golem-sidenav__icon' />
                        <span>List Quizz</span>
                    </Link>
                </li>
            </ul>

            <div className='golem-legal'>2019 © All right reserved.</div>
        </nav>
    );
}

export default sidebar;