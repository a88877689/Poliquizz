import React from 'react';
import PageTitle from '@/components/PageTitle/PageTitle';

const Documentation = () => {
    return (
        <div className='golem-main-view-container'>
            <PageTitle
                title="Documentation"
                pages={[
                    { to: '/documentation', title: 'Documentation'},
                ]}
            />
        </div>
    );
}

export default Documentation;