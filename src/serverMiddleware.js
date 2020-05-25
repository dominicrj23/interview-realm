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

const createTodo = item =>
    fetch(`/api/create`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
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
    if (action.type === TODO.UPDATE) {
        next(action);
        const { id, text } = action.payload;
        updateTodo(id, { text }).then(todo => {
            store.dispatch({
                type: SERVER.UPDATE,
                payload: todo
            });
        });
        return;
    }
    if (action.type === TODO.ADD) {
        next(action);
        const { id: oldId } = action.payload;
        createTodo(action.payload).then(todo => {
            store.dispatch({
                type: SERVER.CREATED,
                payload: {
                    ...todo,
                    oldId
                }
            });
        });
        return;
    }
    next(action);
};
