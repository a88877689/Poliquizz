import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createNotification } from 'react-redux-notify';
import * as tokenActions from "./../../redux/actions/token";
import DefaultImage from "./../../assets/default-image.gif";
import { getUserMe } from "./../../api/user";
import { onError } from "./../../notifications/notify";

const Header = (props) => {
    let [ userMe, setUserMe ] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserMe();
                setUserMe(response.data.user);
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
            }
        }
        fetchData();
    }, []);
    
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
                    {`${userMe.name} ${userMe.lastname}`}
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
        onDeleteToken: () => dispatch(tokenActions.deleteToken()),
        onCreateNotification: (config) => dispatch(createNotification(config))
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);