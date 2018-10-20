import {
    SAVE_TRIP,
    SELECTED_TRIP,
    UPDATE_HEADER_TITLE,
    SELECTED_CITY,
    ADD_FLIGHT_TO_CITY
} from '../actions';
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
        case ADD_FLIGHT_TO_CITY:
            let {trips} = state,
                {tripId, cityIndex, flight} = action;
            let trip = getTrip(tripId, state);
            let city = trip.cities[cityIndex];

            city.flight = flight;
            trip.cities[cityIndex] = city;
            trips[getTripIndex(tripId, state)] = trip;

            return mergeObjects(state, {trips: [...trips]});
    }

    return state;
}

function getTrip(id, state) {
    return state.trips.find((trip) => trip.id === id);
}

function getTripIndex(id, state) {
    return state.trips.findIndex((trip) => trip.id === id);
}
