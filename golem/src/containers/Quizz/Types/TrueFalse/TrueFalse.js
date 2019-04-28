import React from 'react';
import { Input, Switch } from 'element-react';
import Aux from '@/high-order-components/Aux';

const trueFalse = () => {
    return (
        <Aux>
            <Input placeholder="Quizz" />

            <Switch
                onColor="#EB2F64"
                offColor="#999"
                onValue="True"
                offValue="False"
            />

            <Input type="textarea" placeholder="Feedback" />
        </Aux>
    );
}

export default trueFalse;