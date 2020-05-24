import { REHYDRATE, ADD, TOGGLE, UPDATE } from './actions';
import { v4 as uuid } from 'uuid';
export default (state = {}, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
        case REHYDRATE: {
            if (payload.source === 'localStorage') {
                return payload.value;
            }
            return state;
        }
        case ADD: {
            const id = uuid();
            return {
                ...state,
                [id]: {
                    id,
                    completed: false,
                    text: payload.text
                }
            };
        }
        case TOGGLE: {
            const { id } = payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    completed: !state[id].completed
                }
            };
        }
        case UPDATE: {
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
