import React, {
    FC,
    useState,
    useCallback,
    Dispatch,
    SetStateAction
} from 'react';
import clsx from 'clsx';

type TodoItemProp = {
    text: string;
    completed: boolean;
};

const toggle = (setStateCallback: Dispatch<SetStateAction<boolean>>) => () =>
    setStateCallback(state => !state);

export const TodoItem: FC<TodoItemProp> = ({ text, completed }) => {
    const [editing, setEditing] = useState(false);

    const toggleEditing = useCallback(toggle(setEditing), []);

    return (
        <li
            className={clsx({
                completed,
                editing
            })}>
            <div className='view'>
                <button className='edit-text' onClick={toggleEditing}></button>
                <input className='toggle' type='checkbox' checked={completed} />
                <label>{text}</label>
            </div>
            <input className='edit' onBlur={toggleEditing} />
        </li>
    );
};
