import React, {
    FC,
    KeyboardEvent,
    useState,
    useCallback,
    ChangeEvent
} from 'react';

import context from '../context';
import { ADD } from '../actions';

export const Header: FC = () => {
    const dispatch = context.useDispatchContext();
    const [title, setTitle] = useState<string>('');
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleKeyUp = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.keyCode === 13) {
                dispatch({ type: ADD, payload: { text: title } });
                setTitle('');
            } else if (event.keyCode === 27) {
                setTitle('');
            }
        },
        [dispatch, title]
    );

    return (
        <header className='header'>
            <h1>todos</h1>
            <input
                className='new-todo'
                placeholder='Add text for new todo'
                value={title}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                autoFocus
            />
        </header>
    );
};

export default Header;
