import { INIT, REHYDRATE } from './actions';

const localStorageKey = 'todo-app';

export default store => next => action => {
    next(action);
    if (action.type === INIT) {
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
    }
};
