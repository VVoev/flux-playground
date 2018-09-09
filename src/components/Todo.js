import React from 'react';

const Todo = (props) => {

    const { text, complete } = props;
    const convertToText = complete + '';

    return (
        <li >
            <div onClick={props.clicked} data={props.id}>Name:{text}</div>
            <div onClick={props.completed} data={props.id}>IsCompleted:{convertToText}</div>
        </li>
    );
};

export default Todo;