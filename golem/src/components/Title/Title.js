import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Title = ({ title, pages }) => (
    <React.Fragment>
        <h1 className="golem-margin__medium golem-font-type__bold">{title}</h1>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb golem-padding-left__medium">
                {_.slice(pages, 0, pages.length - 1).map(({ to, pageName }, index) => (
                    <li className="breadcrumb-item" key={index}>
                        <Link to={to}>{pageName}</Link>
                    </li>
                ))}
                <li className="breadcrumb-item">
                    {pages[pages.length - 1].pageName}
                </li>
            </ol>
        </nav>
    </React.Fragment>
);

export default Title;