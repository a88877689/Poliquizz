import React from 'react';
import { Dropdown, Form, Button } from 'element-react';
import { Numeric, SelectMenu, TrueFalse } from '@/containers/Quizz/Types/index';

const NewQuizz = ({ fields }) => (
    <React.Fragment>
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
                    fields.pop()
                    fields.push({ type: command });
                }}
            >
                <Button type="success" size="small">
                    <span>Select Quizz</span>
                    <i className="el-icon-caret-bottom el-icon--right"></i> 
                </Button>
            </Dropdown>
        </div>

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
                    <Form.Item className="text-right">
                        <Button
                            // onClick={handleSubmit}
                            type="success" size="small"
                        >
                            Create Quizz
                        </Button>
                    </Form.Item>
                </React.Fragment>
            );
        })}
    </React.Fragment>
);

export default NewQuizz; 