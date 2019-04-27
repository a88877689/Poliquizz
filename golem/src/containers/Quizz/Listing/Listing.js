import { Button, Table } from 'element-react';
import React, { useState } from 'react';
import './Listing.scss';

const listing = () => {
    const [state, setState] = useState({
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
                width: 200,
                render(data){
                    return <span>{data.name}</span>
                }
            },
            {
                label: "Quizz",
                prop: "quizz",
                width: 400,
                render(data){
                    return <span>{data.quizz}</span>
                }
            },
            {
                label: "Date",
                prop: "date",
                width: 180,
                render(data){
                    return <span>{data.date}</span>
                }
            },
            {
                label: "",
                render: function() {
                    return (
                        <span>
                            <Button type="danger" size="small">Delete</Button>
                        </span>
                    )
                }
            }
        ],
        data: [{
            id: '1',
            name: 'Presidents',
            quizz: 'Who is the current president of México?',
            date: '2016-05-03',
            type: 'Drag and drop'
        }, {
            id: '2',
            name: 'Movies',
            quizz: 'Match the movie with its grossing',
            date: '2016-05-03',
            type: 'Matching'
        }, {
            id: '3',
            name: 'Maths',
            quizz: 'Result of this Laplace Transform',
            date: '2016-05-03',
            type: 'Calculated'
        }, {
            id: '4',
            name: 'Programming',
            quizz: 'Is this app made with ReactJS?',
            date: '2016-05-03',
            type: 'True or false'
        }]
    });

    const handleDelete = (row) => {
        let columns = state.columns
        let data = state.data.filter(x => x.id !== row.id);
        setState({
            columns: columns,
            data: data
        });
        console.log(row);
    }

    const handleRowClick = (row, event, column) => {
        if(column.label) {
            console.log(row.name);
        } else {
            handleDelete(row);
        }
    };

    return (
        <div class="golem-listing-custom-btn">
            <Table
                columns={state.columns}
                data={state.data}
                highlightCurrentRow={true}
                onRowClick={handleRowClick}
            />
        </div>
        
    )
}

export default listing;