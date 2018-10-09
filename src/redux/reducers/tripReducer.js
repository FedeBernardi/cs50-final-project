import {SAVE_TRIP} from '../actions';
import {mergeObjects} from '../../utils/functions';

const initialState = {
    trips: []
}

export default function tripReducer(state = initialState, action) {
    switch(action.type) {
        case SAVE_TRIP:
            return mergeObjects(state, {trips: [...state.trips, action.trip]});
    }

    return state;
}
