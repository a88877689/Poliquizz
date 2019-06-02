import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CollapseButton from "./CollapseButton";
import * as sidebarActions from "./../../redux/actions/sidebar";
import DefaultImage from "./../../assets/default-image.gif";

const Footer = (props) => {
    let handleCollapse = () => {
        if(props.isCollapsed) {
            props.onToggle();
        } else {
            props.onCollapse();
        }
    }

    const mobileFooter = (
        <img
            style={{ margin: ".5rem" }}
            className="golem-header__logo"
            src={DefaultImage}
            alt="default" />
    );

    const desktopFooter = (
        <ul className="golem-sidenav">
            <li className="golem-sidenav__item">
                <Link 
                    to=""
                    onClick={handleCollapse}
                    className="golem-sidenav__link golem-font-type__light golem-font-spacing__one"
                >
                    <CollapseButton />
                </Link>
            </li>
        </ul>
    );

    return (
        <React.Fragment>
            {!props.isMobile ? desktopFooter : mobileFooter}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.sidebar,
        ...state.device
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCollapse: () => dispatch(sidebarActions.collapse()),
        onToggle: () => dispatch(sidebarActions.toggle())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);