import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { compose, lifecycle } from 'recompose';
import { Notify } from 'react-redux-notify';
import { CreateUser, ListingUser, UpdateUser } from "./../views/User/index";
import { CreateExam, ListingExam, UpdateExam } from "./../views/Exam/index";
import { ListingQuizz, UpdateQuizz } from "./../views/Quizz/index";
import Sidebar from "./../components/Sidebar/Sidebar";
import Header from "./../components/Header/Header";
import Home from "./../views/Home/Home";
import * as tokenActions from "./../redux/actions/token";

const Layout = (props) => {
    let sidebarClass = props.isCollapsed ? "golem-sidebar-collapse-container" : "golem-sidebar-container";

    return (
        <div className="golem-container">
            <Notify position="BottomRight" />
            <div className={sidebarClass}><Sidebar /></div>
            <div className="golem-main-container">
                <Header />
                <div className="golem-component-container">
                    <Switch>
                        {props.user.role === "admin" ? <Route path="/user/update/:id" component={UpdateUser} /> : null}
                        {props.user.role === "admin" ? <Route path="/user/create" component={CreateUser} /> : null}
                        {props.user.role === "admin" ? <Route path="/user" component={ListingUser} /> : null}
                        {props.user.role !== "student" ? <Route path="/quizz/update/:id" component={UpdateQuizz} /> : null}
                        {props.user.role !== "student" ? <Route path="/quizz" component={ListingQuizz} /> : null}
                        {props.user.role !== "student" ? <Route path="/exam/update/:id" component={UpdateExam} /> : null}
                        {props.user.role !== "student" ? <Route path="/exam/create" component={CreateExam} /> : null}
                        <Route path="/exam" component={ListingExam} />
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
        ...state.token,
        ...state.user
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
            if(!this.props.token) {
                this.props.history.replace("/login");
            }
        }
    })
)(Layout);