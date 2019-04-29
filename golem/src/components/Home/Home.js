import React from 'react';
import GithubLogo from '@/assets/github-corner.png';
//import './Home.scss';

const Home = () => {
    return (
        <div className='golem-main-view-container'>
            <div className='golem-home'>
                <span className='golem-home__welcome'>Welcome!</span>
                <a
                    href='https://github.com/Davestring/PoliQuizz/'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={GithubLogo}
                        alt='github logo'
                        className='golem-home__github' />
                </a>
            </div>
        </div>
    );
}

export default Home;