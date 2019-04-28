import React from 'react';
import { Link }  from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faHome);
library.add(faFileAlt);

const sidebar = () => {
    return (
        <nav className='golem-sidebar'>
            <ul className='golem-sidenav'>
                <li className='golem-sidenav__item'>
                    <Link to='/' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='home' className='golem-sidenav__icon' />
                        <span>Home</span>
                    </Link>
                </li>
                <li className='golem-sidenav__item'>
                    <Link to='/quizz' className='golem-sidenav__link'>
                        <FontAwesomeIcon icon='file-alt' className='golem-sidenav__icon' />
                        <span>Quizz</span>
                    </Link>
                </li>
                
            </ul>

            <div className='golem-legal'>2019 © All right reserved.</div>
        </nav>
    );
}

export default sidebar;