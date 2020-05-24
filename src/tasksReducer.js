import { TODO, LOCALSTORAGE } from './actions';
import { v4 as uuid } from 'uuid';
export default (state = {}, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
        case LOCALSTORAGE.REHYDRATE: {
            return payload.value;
        }
        case TODO.ADD: {
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
