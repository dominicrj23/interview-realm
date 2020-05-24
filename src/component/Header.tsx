import React, { FC } from 'react';

export const Header: FC = () => {
    return (
        <header className='header'>
            <h1>todos</h1>
            <input
                className='new-todo'
                placeholder='Add text for new todo'
                autoFocus
            />
        </header>
    );
};

export default Header;
