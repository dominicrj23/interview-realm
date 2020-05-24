import React, {
    FC,
    useState,
    useCallback,
    Dispatch,
    SetStateAction
} from 'react';
import clsx from 'clsx';
import { TOGGLE } from '../actions';
import context from '../context';
type TodoItemProp = {
    id: string;
    text: string;
    completed: boolean;
};

const toggle = (setStateCallback: Dispatch<SetStateAction<boolean>>) => () =>
    setStateCallback(state => !state);

export const TodoItem: FC<TodoItemProp> = ({ id, text, completed }) => {
    const [editing, setEditing] = useState(false);
    const dispatch = context.useDispatchContext();

    const toggleEditing = useCallback(toggle(setEditing), []);

    const toggleCompleted = useCallback(() => {
        dispatch({ type: TOGGLE, payload: { id } });
    }, [dispatch, id]);
    return (
        <li
            className={clsx({
                completed,
                editing
            })}>
            <div className='view'>
                <button className='edit-text' onClick={toggleEditing}></button>
                <input
                    className='toggle'
                    type='checkbox'
                    checked={completed}
                    onChange={toggleCompleted}
                />
                <label>{text}</label>
            </div>
            <input className='edit' onBlur={toggleEditing} />
        </li>
    );
};
