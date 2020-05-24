import React, { createContext, useContext } from 'react';
import createReducer from 'react-use/lib/createReducer';
import taskReducer from './tasksReducer';
import localStorageMiddleware from './localStorageMiddleware';

export const generateContext = (reducer, middlewares) => {
    const useReducer = createReducer(...middlewares);

    const AppStateContext = createContext({});
    const AppDispatchContext = createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, {});
        return (
            <AppStateContext.Provider value={state}>
                <AppDispatchContext.Provider value={dispatch}>
                    {children}
                </AppDispatchContext.Provider>
            </AppStateContext.Provider>
        );
    };

    const useStateContext = () => {
        return useContext(AppStateContext);
    };
    const useDispatchContext = () => {
        return useContext(AppDispatchContext);
    };
    return { useStateContext, useDispatchContext, Provider };
};

export default generateContext(taskReducer, [localStorageMiddleware]);
