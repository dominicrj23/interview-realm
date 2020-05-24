import React, { FC } from 'react';
import clsx from 'clsx';
import { TodoItem } from './TodoItem';

const todos = [
    {
        text: 'Sample text for todo',
        completed: false
    }
];

export const TodoList: FC = () => {
    return (
        <ul className={clsx('todo-list', { empty: todos.length === 0 })}>
            {todos.map(todo => (
                <>
                    <TodoItem {...todo} />
                </>
            ))}
        </ul>
    );
};

export default TodoList;
