import { APP, LOCALSTORAGE, TODO } from './actions';

const localStorageKey = 'todo-app';
const updateActions = [TODO.ADD, TODO.TOGGLE, TODO.UPDATE];

export default store => next => action => {
    if (action.type === APP.INIT) {
        next(action);
        const rawValue = localStorage.getItem(localStorageKey);
        if (rawValue) {
            const value = JSON.parse(rawValue);

            store.dispatch({
                type: LOCALSTORAGE.REHYDRATE,
                payload: {
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
