import React from "react";
import Title from "./../../../components/Title/Title";

const Create = () => {
    return (
        <React.Fragment>
            <Title
                title="Create New Exam"
                pages={[
                    { to: "/", pageName: "Home" },
                    { to: "/exam", pageName: "Exam" },
                    { pageName: "Create" }
                ]}
            />
        </React.Fragment>
    )
}

export default Create;