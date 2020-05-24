import { REHYDRATE } from './actions';

export default (state = {}, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
        case REHYDRATE: {
            return payload.value;
        }
        default:
            return state;
    }
};
