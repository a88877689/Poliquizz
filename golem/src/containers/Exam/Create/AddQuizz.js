import React from 'react';
import { Dropdown, Button } from 'element-react';
import { Numeric, SelectMenu, TrueFalse } from '@/containers/Quizz/Types/index';

const AddQuizz = ({ fields }) => (
    <React.Fragment>
        {fields.map((field, idx, fields) => {
            const { type } = fields.get(idx);
            let quizz = null;

            switch(type) {
                case 'Numeric':
                    quizz = <Numeric field={field} />
                    break;
                case 'SelectMenu':
                    quizz = <SelectMenu field={field} />
                    break;
                default:
                    quizz = <TrueFalse field={field} />
                    break;
            }

            return (
                <React.Fragment key={idx}>
                    {quizz}
                    <hr />
                </React.Fragment>
            );
        })}

        <div className="text-right">
            <Dropdown
                menu={(
                    <Dropdown.Menu>
                        <Dropdown.Item command='Numeric'>Numeric</Dropdown.Item>
                        <Dropdown.Item command='SelectMenu'>Select Menu</Dropdown.Item>
                        <Dropdown.Item command='TrueFalse'>True/False</Dropdown.Item>
                    </Dropdown.Menu>
                )}
                onCommand={command => {
                    fields.push({ type: command });
                }}
            >
                <Button type="success" size="small">
                    <span>Add Quizz</span>
                    <i className="el-icon-caret-bottom el-icon--right"></i> 
                </Button>
            </Dropdown>
        </div>
    </React.Fragment>
);

export default AddQuizz; 