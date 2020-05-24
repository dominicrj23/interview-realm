import { APP, SERVER } from './actions';

const getTodoIds = () => fetch('/api').then(res => res.json());
const getTodo = id => fetch(`/api/${id}`).then(res => res.json());

export default store => next => action => {
    if (action.type === APP.INIT) {
        next(action);
        getTodoIds().then(idArray => {
            Promise.all(idArray.map(id => getTodo(id))).then(value => {
                store.dispatch({
                    type: SERVER.REHYDRATE,
                    payload: {
                        value
                    }
                });
            });
        });

        return;
    }

    next(action);
};
