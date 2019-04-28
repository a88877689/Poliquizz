import React, { Component } from 'react';
import { Input, InputNumber } from 'element-react';
import Aux from '@/high-order-components/Aux';

class SelectMenu extends Component {
    state = {
        options: 2
    }

    onChange(value) {
        this.state.options = value;
        
        console.log(this.content);
    }

    render() {
        let content = null;
        content = (
            <div>
                {[...Array(this.state.options - 1).keys()].map((_, i) => {
                    return <Input />;
                })}
            </div>
        );

        return (
            <Aux>
                <Input placeholder="Quizz" />
                <InputNumber
                    min={1}
                    defaultValue={this.state.options}
                    onChange={this.onChange.bind(this)}
                />
                {this.content}

                <Input type="textarea" placeholder="Feedback" />
            </Aux>
        );
    }
}

export default SelectMenu;