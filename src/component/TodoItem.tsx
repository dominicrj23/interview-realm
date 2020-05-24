import React, { FC } from 'react';

type TodoItemProp = {
    text: string;
};
export const TodoItem: FC<TodoItemProp> = ({ text }) => {
    return (
        <li>
            <div className='view'>
                <label>{text}</label>
            </div>
        </li>
    );
};
