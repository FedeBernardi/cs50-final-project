import {SAVE_TRIP, SELECTED_TRIP, UPDATE_HEADER_TITLE, SELECTED_CITY} from '../actions';
import {mergeObjects} from '../../utils/functions';

import { APP_NAME } from '../../utils/constants';

const initialState = {
    headerTitle: APP_NAME,
    selectedTrip: '',
    trips: [],
    selectedCityIndex: -1
}

export default function tripReducer(state = initialState, action) {
    switch(action.type) {
        case SAVE_TRIP:
            return mergeObjects(state, {trips: [...state.trips, action.trip]});
        case SELECTED_TRIP:
            return mergeObjects(state, {selectedTrip: action.tripId});
        case UPDATE_HEADER_TITLE:
            return mergeObjects(state, {headerTitle: action.title});
        case SELECTED_CITY:
            return mergeObjects(state, {selectedCityIndex: action.cityIndex});
    }

    return state;
}
