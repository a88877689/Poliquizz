import React from 'react';
import PageTitle from '@/components/PageTitle/PageTitle';

const Documentation = () => {
    return (
        <React.Fragment>
            <PageTitle
                title="Documentation"
                pages={[
                    { to: '/documentation', title: 'Documentation'},
                ]}
            />
        </React.Fragment>
    );
}

export default Documentation;