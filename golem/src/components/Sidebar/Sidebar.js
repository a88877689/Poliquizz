import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import Logo from "./Logo";

const Sidebar = (props) => {
    return (
        <React.Fragment>
            <div className="golem-sidebar">
                <Logo />
            </div>

            <nav className="golem-space-between-wrapper__column">
                <ul className="golem-sidenav">
                    <li className="golem-sidenav__item">
                        <Link to="/" className="golem-sidenav__link">
                            <FontAwesomeIcon icon="home" className="golem-sidenav__icon" />
                            {!props.isCollapsed ? <span>Home</span> : null }
                        </Link>
                    </li>
                    <li className="golem-sidenav__item">
                        <Link to="/exam" className="golem-sidenav__link">
                            <FontAwesomeIcon icon="pencil-ruler" className="golem-sidenav__icon" />
                            {!props.isCollapsed ? <span>Exams</span> : null }
                        </Link>
                    </li>
                    <li className="golem-sidenav__item">
                        <Link to="/" className="golem-sidenav__link">
                            <FontAwesomeIcon icon="file-alt" className="golem-sidenav__icon" />
                            {!props.isCollapsed ? <span>Documentation</span> : null }
                        </Link>
                    </li>
                </ul>

                <Footer />
            </nav>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ...state.sidebar,
        ...state.device
    }
}

export default connect(
    mapStateToProps
)(Sidebar);