import { INIT, REHYDRATE, ADD, TOGGLE, UPDATE } from './actions';

const localStorageKey = 'todo-app';
const updateActions = [ADD, TOGGLE, UPDATE];

export default store => next => action => {
    if (action.type === INIT) {
        next(action);
        const rawValue = localStorage.getItem(localStorageKey);
        if (rawValue) {
            const value = JSON.parse(rawValue);

            store.dispatch({
                type: REHYDRATE,
                payload: {
                    source: 'localstorage',
                    value
                }
            });
        }
        return;
    }
    if (updateActions.includes(action.type)) {
        next(action);
        const state = store.getState();
        localStorage.setItem(localStorageKey, JSON.stringify(state));
        return;
    }
    next(action);
};
