import { APP, SERVER, TODO } from './actions';

const getTodoIds = () => fetch('/api').then(res => res.json());
const getTodo = id => fetch(`/api/${id}`).then(res => res.json());
const updateTodo = (id, item) =>
    fetch(`/api/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(item)
    }).then(res => res.json());

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
    if (action.type === TODO.TOGGLE) {
        const { id } = action.payload;
        const { completed } = store.getState()[id];
        next(action);

        updateTodo(id, { completed: !completed }).then(todo => {
            store.dispatch({
                type: SERVER.UPDATE,
                payload: todo
            });
        });
        return;
    }
    next(action);
};
