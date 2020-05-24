import React, { FC } from 'react';
import clsx from 'clsx';
import { TodoItem } from './TodoItem';
import context from '../context';

export const TodoList: FC = () => {
    const todoOb = context.useStateContext();
    //@ts-ignore
    const todos = Object.keys(todoOb).map(k => todoOb[k]);

    return (
        <ul className={clsx('todo-list', { empty: todos.length === 0 })}>
            {todos.map(todo => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
};

export default TodoList;
