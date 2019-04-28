import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'element-react';

const PageTitle = ({title, pages}) => (
    <React.Fragment>
        <h1 className="m-b-sm">{title}</h1>
        <Breadcrumb separator="/" className="m-b">
            <Breadcrumb.Item><Link to="/">Inicio</Link></Breadcrumb.Item>
            {pages.slice(0, -1).map(({ to, title }, idx) => (
                <Breadcrumb.Item key={idx}>
                    <Link to={to}>{title}</Link>
                </Breadcrumb.Item>
            ))}
            <Breadcrumb.Item>{pages[pages.length - 1].title}</Breadcrumb.Item>
        </Breadcrumb>
    </React.Fragment>
);

export default PageTitle;