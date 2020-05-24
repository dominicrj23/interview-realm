import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import TodoList from './component/TodoList';

function App() {
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
