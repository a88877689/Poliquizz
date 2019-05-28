import React from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import Title from "./../../components/Title/Title";

const Home = () => {
    return (
        <React.Fragment>
            <Title
                title="Welcome!"
                pages={[
                    { pageName: "Home" }
                ]}
            />
            <Jumbotron className="golem-margin__medium golem-font-size__twelve">
            <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                <span className="golem-font-type__bold golem-font-color__rose">Poliquizz</span> is
                a platform were teachers can create dynamic exams that include different types of
                quizzes with multimedia content (optionally). Any one can participate and see its
                result instantly so, what are you waiting to get started?
            </p>
            </Jumbotron>
            <Row className="golem-margin-top__medium">
                <Col
                    xs={{ span: 8, offset: 2 }}
                    md={{ span: 6, offset: 3 }}
                >
                    {/* TODO: Insert content here */}
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Home;