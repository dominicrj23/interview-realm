import React, { FC } from 'react';
import clsx from 'clsx';

type TodoItemProp = {
    text: string;
    completed: boolean;
};
export const TodoItem: FC<TodoItemProp> = ({ text, completed }) => {
    return (
        <li
            className={clsx({
                completed
            })}>
            <div className='view'>
                <input className='toggle' type='checkbox' checked={completed} />
                <label>{text}</label>
            </div>
        </li>
    );
};
