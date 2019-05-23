import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout, Loading, Table } from 'element-react';
import { deleteQuizzAction, getQuizzesAction } from '@/actions/quizz';
import PageTitle from '@/components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Listing = (props) => {
    const [listingState] = useState({
        columns: [
            {
                label: "ID",
                prop: 'id',
                width: 80,
                render(data) {
                    return <span>{data.id}</span>
                }
            },
            {
                label: "Name",
                prop: "name",
                width: 220,
                render(data){
                    return <span>{data.name}</span>
                }
            },
            {
                label: "Type",
                prop: "type",
                width: 360,
                render(data){
                    return <span>{data.type}</span>
                }
            },
            {
                label: "Date",
                prop: "date",
                width: 140,
                render(data){
                    return <span>{data.date}</span>
                }
            },
            {
                label: "XML",
                width: 70,
                render: function(data) {
                    return (
                        <span>
                            <a href={data.url} target="_blank" rel="noopener noreferrer">
                                <Button type="primary" size="small">
                                    <FontAwesomeIcon icon="download" />
                                </Button>
                            </a>
                        </span>
                    )
                }
            },
            {
                label: "",
                render: function() {
                    return (
                        <span>
                            <Button type="danger" size="small">
                                <FontAwesomeIcon icon="trash" />
                            </Button>
                        </span>
                    )
                }
            }
        ]
    });

    let fetchData = () => {
        props.dispatch(getQuizzesAction());
    }

    useEffect(() => {        
        fetchData();
    }, []);

    const handleDelete = (row) => {
        const index = props.quizzes.findIndex(element => element.id === row.id);
        //props.dispatch(deleteQuizzAction(row.id));
        props.quizzes.splice(index, 1);
    }

    const handleRowClick = (row, event, column) => {
        if(column.label && column.label !== 'XML') {
            props.history.replace(`/exams/update/${row.id}`);
        } 
        if(!column.label) {
            handleDelete(row);
        }
    };

    return (
        <Loading
            loading={props.loading}
            text='Downloading exams...'>
            <div className='golem-main-view-container'>
                <PageTitle
                    title="Exams"
                    pages={[
                        { title: 'Exams' }
                    ]}
                />
                <div className="text-right m-b">
                    <Link to={`${props.match.url}/create`}>
                        <Button type="success" size="small">Create Exam</Button>
                    </Link>
                </div>
                <Layout.Row>
                    <Layout.Col>
                        <Table
                            columns={listingState.columns}
                            data={props.quizzes}
                            highlightCurrentRow={true}
                            onRowClick={handleRowClick}
                        />
                    </Layout.Col>
                </Layout.Row>
            </div>
        </Loading>
    );
}

export default connect(
    state => ({
        ...state.loader,
        ...state.quizz
    }),
)(Listing);