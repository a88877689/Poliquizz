import React from 'react';
import Aux from '@/high-order-components/Aux';
import Logo from '@/assets/logo.png';
import UserPhoto from '@/assets/default-user-photo.svg';

const navbar = () => {
    return (
        <Aux>
            <img src={Logo} alt='golem logo' class='golem-logo' />
            
            <nav class='golem-user-nav'>
                <div class='golem-user-nav__user'>
                    <span class='golem-user-nav__user-name'>Username</span>
                    <img src={UserPhoto} class='golem-user-nav__user-photo' alt='user-photo' />
                </div>
            </nav>
        </Aux>
    );
}

export default navbar;