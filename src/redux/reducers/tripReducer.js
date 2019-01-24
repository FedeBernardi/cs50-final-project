import {
    SAVE_TRIP,
    SELECTED_TRIP,
    UPDATE_HEADER_TITLE,
    SELECTED_CITY,
    ADD_FLIGHT_TO_CITY,
    DELETE_FLIGHT,
    ADD_LODGING_INFO_TO_CITY,
    EDIT_LODGING_INFO,
    DELETE_LODGING,
    ADD_PLAN_TO_CITY,
    EDIT_DAY_PLANS_LIST
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
        case EDIT_LODGING_INFO:
            return modifyCity(state, action, editLodging);
        case DELETE_LODGING:
            return modifyCity(state, action, deleteLodgingInfo);
        case ADD_PLAN_TO_CITY:
            return modifyCity(state, action, addItineraryPlan);
        case EDIT_DAY_PLANS_LIST:
            return modifyCity(state, action, reorderDayPlans);
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
    trip.cities[selectedCityIndex] = {...modifiedCity};
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

function editLodging(city, action) {
    const {lodgingInfo, lodgingIndex} = action;

    city.lodgingInfo[lodgingIndex] = lodgingInfo;
    return city;
}

function deleteLodgingInfo(city, action) {
    city.lodgingInfo.splice(action.lodgingIndex, 1);
    if (!city.lodgingInfo.length) {
        delete city.lodgingInfo;
    }

    return city;
}

function addItineraryPlan(city, action) {
    const {plan, dateIndex, itineraryLength} = action;

    city.itinerary = !!city.itinerary ? city.itinerary : new Array(itineraryLength);
    if (city.itinerary[dateIndex]) {
        city.itinerary[dateIndex].push(plan);
    } else {
        city.itinerary[dateIndex] = [plan];
    }

    return city;
}

/**
 * Reorders the plans for a particular day in the itinerary.
 * 
 * @param {Object} city 
 * @param {Object} action 
 */
function reorderDayPlans(city, action) {
    let {itinerary} = city,
        dayToEdit = null,
        newDay = null,
        dayPositionInItinerary = null,
        daysWithPlans = -1;

    // First we look for the original day in the itinerary.
    // Since the position sent in the action referes to a filtered array
    // I need to count how many days with dayPlans I iterated already.
    for (let i = 0; i < itinerary.length; i++) {
        if (itinerary[i] !== null) {
            daysWithPlans++;
            if (daysWithPlans === action.dayPosition) {
                dayToEdit = itinerary[i];
                dayPositionInItinerary = i;
                break;
            }
        }
    }

    // Then we iterate moving the items given the new order.
    newDay = Array(dayToEdit.length);
    for (let j = 0; j < action.newOrder.length; j++) {
        newDay[j] = dayToEdit[action.newOrder[j]];
    }

    // Lastly we assign it to the origina position in the itinerary array.
    city.itinerary[dayPositionInItinerary] = [...newDay];
    city.itinerary = [...city.itinerary];

    return city;
}
