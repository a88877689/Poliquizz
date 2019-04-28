import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '@/high-order-components/Aux';
import Logo from '@/assets/logo.png';
import UserPhoto from '@/assets/default-user-photo.svg';

const navbar = () => {
    return (
        <Aux>
            <Link to="/">
                <img src={Logo} alt='golem logo' className='golem-logo' />
            </Link>
            
            <nav className='golem-user-nav'>
                <div className='golem-user-nav__user'>
                    <span className='golem-user-nav__user-name'>Davestring</span>
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" className='golem-user-nav__user-photo' alt='user' />
                </div>
            </nav>
        </Aux>
    );
}

export default navbar;