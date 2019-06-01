import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createNotification } from 'react-redux-notify';
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import Table from "./../../../components/Table/Table";
import * as loaderActions from "./../../../redux/actions/loader";
import { usersColumns } from "./../../../utils/tableColumns";
import { getAllUsers } from "./../../../api/user";
import { onSuccess, onError } from "./../../../notifications/notify";

const Listing = (props) => {
    let [ userState, setUserState ] = useState([]);

    const fetchData = async () => {
        try {
            props.onShowLoader();
            const response = await getAllUsers();
            props.onCreateNotification(onSuccess(response.data.message));
            response.data.users.map(user => {
                user.delete = (
                    <Button variant="danger">
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                );
                return user
            });
            setUserState(response.data.users);
            props.onHideLoader();
        } catch(error) {
            let message = error.response ? error.response.data.message : "Oops! Something went wront";
            props.onCreateNotification(onError(message));
            props.onHideLoader();
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onCreateNewUser = () => {
        console.log("onCreateNewUser");
    }

    const onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                if(column.Header === "") {
                    console.log("delete");
                } else {
                    console.log("update");
                }
            }
        }
    }

    return (
        <React.Fragment>
            <Title
                title="Users Listing"
                pages={[
                    { to: "/", pageName: "Home" },
                    { pageName: "User" }
                ]}
            />
            <Row>
                <Col>
                    <Button
                        size="lg"
                        onClick={onCreateNewUser}
                        className="golem-margin-left__medium golem-margin-top__small"
                        variant="success"
                    >
                        Create New User
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="golem-margin__medium golem-text-align__center golem-font-size__twelve">
                        <LoadingOverlay
                            active={props.loading}
                            spinner={<CircleLoader color={"#EB2F64"} />}
                        >
                            <Table
                                data={userState}
                                columns={usersColumns}
                                clickEvent={onRowClick}
                            />
                        </LoadingOverlay>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.loader,
        ...state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onCreateNotification: (config) => dispatch(createNotification(config))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Listing);
