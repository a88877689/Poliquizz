import React from 'react';
import Aux from '@/high-order-components/Aux';
import Logo from '@/assets/logo.png';
import UserPhoto from '@/assets/default-user-photo.svg';

const navbar = () => {
    return (
        <Aux>
            <img src={Logo} alt='golem logo' className='golem-logo' />
            
            <nav className='golem-user-nav'>
                <div className='golem-user-nav__user'>
                    <span className='golem-user-nav__user-name'>Username</span>
                    <img src={UserPhoto} className='golem-user-nav__user-photo' alt='user' />
                </div>
            </nav>
        </Aux>
    );
}

export default navbar;