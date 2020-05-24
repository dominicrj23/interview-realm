import React, { useEffect } from 'react';

import Header from './component/Header';
import Footer from './component/Footer';
import TodoList from './component/TodoList';
import context from './context';
import { INIT } from './actions';

function App() {
    const dispatch = context.useDispatchContext();

    useEffect(() => {
        dispatch({ type: INIT });
    }, [dispatch]);

    return (
        <section className='todoapp'>
            <Header />
            <section className='main'>
                <TodoList />
            </section>
            <Footer />
        </section>
    );
}

export default App;
