import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { compose, lifecycle } from 'recompose';
import Sidebar from "./../components/Sidebar/Sidebar";
import Header from "./../components/Header/Header";
import { Create, Listing, Update } from "./../views/Exam/index";
import Home from "./../views/Home/Home";
import * as tokenActions from "./../redux/actions/token";

const Layout = (props) => {
    let sidebarClass = props.isCollapsed ? "golem-sidebar-collapse-container" : "golem-sidebar-container";

    return (
        <div className="golem-container">
            <div className={sidebarClass}><Sidebar /></div>
            <div className="golem-main-container">
                <Header />
                <div className="golem-main-container">
                    <Switch>
                        <Route path="/exam/update/:id" component={Update} />
                        <Route path="/exam/create" component={Create} />
                        <Route path="/exam" component={Listing} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.sidebar,
        ...state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPersistToken: (payload) => dispatch(tokenActions.persistToken(payload))
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidUpdate() {
            // if(!this.props.token) {
            //     this.props.history.replace("/login");
            // }
        }
    })
)(Layout);