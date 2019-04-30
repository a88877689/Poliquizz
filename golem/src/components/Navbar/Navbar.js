import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import DefaultImage from '@/assets/default-image.gif';
// import { deleteToken } from '@/actions/auth';
import { Dropdown } from 'element-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUser } from '@/mock/user';
import { Message } from 'element-react';
import { defaultProps } from 'recompose';

const navbar = (props) => {
    let [navState, setNavState] = useState({
        username: ''
    })

    let fetchData = async () => {
        try {
            let response = await getUser();
            console.log(response)
            setNavState({ username: response.data.username })
        } catch(err) {
            Message({
                message: 'Error loading your username',
                type: 'error'
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    let handleLogout = () => {
        console.log('hola');
        localStorage.clear()
    }
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
                )}
                onCommand={command => {
                    handleLogout()
                }}>
                <nav className='golem-user-nav'>
                    <div className='golem-user-nav__user'>
                        <span className="el-dropdown-link">
                            <img src={DefaultImage} className='golem-user-nav__user-photo' alt='user' />
                            <span className='golem-user-nav__user-name'>{navState.username}</span>
                            <FontAwesomeIcon icon="caret-down" />
                        </span>
                    </div>
                </nav>
            </Dropdown>
        </React.Fragment>
    );
}

export default navbar;