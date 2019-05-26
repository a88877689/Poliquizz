import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import * as tokenActions from "./../../redux/actions/token";
import DefaultImage from "./../../assets/default-image.gif";
import { getUserMe } from "./../../api/user";

const Header = (props) => {
    let [ userMe, setUserMe ] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserMe();
                setUserMe(response.data.me);
            } catch(error) {
                console.log(error.response);
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
        onDeleteToken: () => dispatch(tokenActions.deleteToken())
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);