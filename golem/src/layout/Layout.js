import React from "react";
import { connect } from "react-redux";
import Sidebar from "./../components/Sidebar/Sidebar";
import Header from "./../components/Header/Header";
import Title from "./../components/Title/Title";

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

export default connect(
    mapStateToProps
)(Layout);