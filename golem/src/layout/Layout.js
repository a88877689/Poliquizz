import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from 'recompose';
import Sidebar from "./../components/Sidebar/Sidebar";
import Header from "./../components/Header/Header";
import Title from "./../components/Title/Title";
import * as tokenActions from "./../redux/actions/token";

const Layout = (props) => {
    let sidebarClass = props.isCollapsed ? "golem-sidebar-collapse-container" : "golem-sidebar-container";

    return (
        <div className="golem-container">
            <div className={sidebarClass}><Sidebar /></div>
            <div className="golem-main-container">
                <Header />
                <div className="golem-main-container__component">
                    <Title
                        title="Welcome"
                        pages={[
                            { to: "/", pageName: "Home" },
                            { pageName: "Welcome" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.sidebar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPersistToken: (payload) => dispatch(tokenActions.persistToken(payload)),
        onLoadToken: () => dispatch(tokenActions.loadToken()), 
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            const token = localStorage.getItem("token");
            if(!token) {
                this.props.history.replace("/login");
            } else {
                this.props.onLoadToken();
            }
        }
    })
)(Layout);