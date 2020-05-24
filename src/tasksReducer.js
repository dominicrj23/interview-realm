import { TODO, LOCALSTORAGE, SERVER } from './actions';
export default (state = {}, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
        case LOCALSTORAGE.REHYDRATE: {
            return payload.value;
        }
        case SERVER.REHYDRATE: {
            const newState = payload.value.reduce(
                (st, todo) => ({
                    ...st,
                    [todo.id]: todo
                }),
                {}
            );

            return newState;
        }
        case SERVER.UPDATE: {
            return {
                ...state,
                [payload.id]: payload
            };
        }
        case SERVER.CREATED: {
            const { oldId, ...todo } = payload;
            const { [oldId]: oldTodo, ...newState } = state;
            return {
                ...newState,
                [todo.id]: todo
            };
        }
        case TODO.ADD: {
            const { id, text } = payload;
            return {
                ...state,
                [id]: {
                    id,
                    completed: false,
                    text
                }
            };
        }
        case TODO.TOGGLE: {
            const { id } = payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    completed: !state[id].completed
                }
            };
        }
        case TODO.UPDATE: {
            const { id, ...value } = payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    ...value
                }
            };
        }
        default:
            return state;
    }
};
