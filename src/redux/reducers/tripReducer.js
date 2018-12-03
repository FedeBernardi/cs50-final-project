import {
    SAVE_TRIP,
    SELECTED_TRIP,
    UPDATE_HEADER_TITLE,
    SELECTED_CITY,
    ADD_FLIGHT_TO_CITY,
    DELETE_FLIGHT,
    ADD_LODGING_INFO_TO_CITY
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
            return modifyCity(state, action, modifyFlight);
        case DELETE_FLIGHT:
            return modifyCity(state, action, modifyFlight);
        case ADD_LODGING_INFO_TO_CITY:
            return modifyCity(state, action, addLodgingInfoToCity);
    }

    return state;
}

/**
 * It gets the city that the user is editing or adding info to.
 * Once it gets it, executes the callback which is responsible to modify the fields
 * inside the city object. It gets back the modified city and replaces it in the trip object.
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Function} callback
 */
function modifyCity(state, action, callback) {
    let {trips, selectedTrip, selectedCityIndex} = state;
    let trip = getTrip(selectedTrip, state);
    let city = trip.cities[selectedCityIndex];

    modifiedCity = callback(city, action);
    trip.cities[selectedCityIndex] = modifiedCity;
    trips[getTripIndex(selectedTrip, state)] = trip;

    return mergeObjects(state, {trips: [...trips]});
}

function getTrip(id, state) {
    return state.trips.find((trip) => trip.id === id);
}

function getTripIndex(id, state) {
    return state.trips.findIndex((trip) => trip.id === id);
}

function modifyFlight(city, action) {
    city.flight = action.flight;
    return city;
}

function addLodgingInfoToCity(city, action) {
    const {lodgingInfo} = action;

    if (city.lodgingInfo) {
        city.lodgingInfo.push(lodgingInfo);
    } else {
        city.lodgingInfo = [lodgingInfo];
    }

    return city;
}
