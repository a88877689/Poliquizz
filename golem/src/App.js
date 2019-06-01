import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import Login from "./views/Login/Login"
import Layout from "./layout/Layout";
import * as sidebarActions from "./redux/actions/sidebar";
import * as deviceActions from "./redux/actions/device";
import * as tokenActions from "./redux/actions/token";
import * as userActions from "./redux/actions/user";
import mobileDevices from "./utils/mobileDevices";

const App = () => {
  return (
    <React.Fragment>
        <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Layout} />
            </Switch>
        </Router>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.device,
    ...state.sidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isMobile: () => dispatch(deviceActions.isMobile()),
    notMobile: () => dispatch(deviceActions.notMobile()),
    onCollapse: () => dispatch(sidebarActions.collapse()),
    onLoadToken: () => dispatch(tokenActions.loadToken()),
    onLoadUser: () => dispatch(userActions.loadUser())
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.onLoadToken();
      this.props.onLoadUser();
      if(mobileDevices.any()) {
        this.props.isMobile();
        this.props.onCollapse();
      } else {
        this.props.notMobile();
      }
    }
  })
)(App);
