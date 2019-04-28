import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import DefaultImage from '@/assets/default-image.gif';
import { Dropdown } from 'element-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navbar = () => {
    return (
        <React.Fragment>
            <Link to="/">
                <div className="golem-logo-content">
                    <img src={Logo} alt='golem logo' className='golem-logo-content__logo' />
                    <div className="golem-logo-content__title">
                        <span>poli-quizz</span>
                    </div>
                </div>
            </Link>
            
            <Dropdown 
                hideOnClick={false}
                menu={(
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/login">Logout</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                )}>
                <nav className='golem-user-nav'>
                    <div className='golem-user-nav__user'>
                        <span className="el-dropdown-link">
                            <img src={DefaultImage} className='golem-user-nav__user-photo' alt='user' />
                            <span className='golem-user-nav__user-name'>Davestring</span>
                            <FontAwesomeIcon icon="caret-down" />
                        </span>
                    </div>
                </nav>
            </Dropdown>
        </React.Fragment>
    );
}

export default navbar;