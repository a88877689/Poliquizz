import React from "react";
import { withRouter } from 'react-router';
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import * as tokenActions from "./../../redux/actions/token";
import DefaultImage from "./../../assets/default-image.gif";
import { getUserMe } from "./../../api/user";

const Header = (props) => {
    const handleLogout = () => {
        props.onDeleteToken();
        props.history.replace("/login");
    }
    
    return (
        <React.Fragment>
            <div className="golem-header">
                {!props.isMobile ? <img
                    className="golem-header__logo"
                    src={DefaultImage}
                    alt="default" /> : null}
                <span className="golem-font-type__bold golem-font-size__twelve">
                    David Martínez
                </span>
                <Button
                    onClick={handleLogout}
                    className="golem-buttons__logout"
                    variant="outline-info"
                >
                    Logout
                </Button>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return { 
        ...state.device
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteToken: () => dispatch(tokenActions.deleteToken())
    }
}

export default withRouter(
    compose(
        connect(
            mapStateToProps,
            mapDispatchToProps
        ),
        lifecycle({
            async componentDidUpdate() {
                try {
                    const response = await getUserMe();
                    console.log(response);
                } catch(error) {
                    console.log(error);
                }
            }
        })
    )(Header)
);