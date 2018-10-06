import {ADD_CITY} from '../actions';
import {mergeObjects} from '../../utils/functions';

const initialState = {
    cities: []
}

export default function tripReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_CITY:
            return mergeObjects(state, {cities: [...state.cities, action.city]});
    }

    return state;
}
