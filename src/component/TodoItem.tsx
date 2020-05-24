import React, {
    FC,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
    useEffect,
    ChangeEvent
} from 'react';
import clsx from 'clsx';
import { TODO } from '../actions';
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
    const [title, setTitle] = useState(text);

    const dispatch = context.useDispatchContext();

    const toggleEditing = useCallback(toggle(setEditing), []);

    const toggleCompleted = useCallback(() => {
        dispatch({ type: TODO.TOGGLE, payload: { id } });
    }, [dispatch, id]);

    const handleTitleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
        },
        []
    );

    const updateText = useCallback(() => {
        setEditing(false);
        dispatch({
            type: TODO.UPDATE,
            payload: { id, text: title }
        });
    }, [dispatch, id, title]);

    useEffect(() => {
        setTitle(text);
    }, [text]);

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
            <input
                className='edit'
                onBlur={updateText}
                value={title}
                onChange={handleTitleChange}
            />
        </li>
    );
};
