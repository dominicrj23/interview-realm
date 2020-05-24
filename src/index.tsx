import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './context';
import 'todomvc-app-css/index.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider>
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
