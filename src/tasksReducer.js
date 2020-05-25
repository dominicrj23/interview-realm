import { TODO, LOCALSTORAGE } from './actions';
export default (state = {}, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
        case LOCALSTORAGE.REHYDRATE: {
            return payload.value;
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
