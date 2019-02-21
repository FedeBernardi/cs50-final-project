export const SAVE_TRIP = 'SAVE_TRIP';
export const SELECTED_TRIP = 'SELECTED_TRIP';
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE';
export const SELECTED_CITY = 'SELECTED_CITY';
export const ADD_FLIGHT_TO_CITY = 'ADD_FLIGHT_TO_CITY';
export const DELETE_FLIGHT = 'DELETE_FLIGHT';
export const ADD_LODGING_INFO_TO_CITY = 'ADD_LODGING_INFO_TO_CITY';
export const EDIT_LODGING_INFO = 'EDIT_LODGING_INFO';
export const DELETE_LODGING = 'DELETE_LODGING';
export const ADD_PLAN_TO_CITY = 'ADD_PLAN_TO_CITY';
export const EDIT_DAY_PLANS_LIST = 'EDIT_DAY_PLANS_LIST';
export const EDIT_ITINERARY_ITEM = 'EDIT_ITINERARY_ITEM';
export const DEELETE_ITINERARY_ITEM = 'DEELETE_ITINERARY_ITEM';

export const addTrip = (trip) => ({type: SAVE_TRIP, trip});

export const selectTripFromMenu = (tripId) => ({type: SELECTED_TRIP, tripId});

export const selectedCityFromTrip = (cityIndex) => ({type: SELECTED_CITY, cityIndex});

export const updateHeaderTitle = (title) => ({type: UPDATE_HEADER_TITLE, title});

export const addFlightToCity = (flight) => ({type: ADD_FLIGHT_TO_CITY, flight});

export const deleteFlightFromCity = () => ({type: DELETE_FLIGHT});

export const addLodgingInfoToCity = (lodgingInfo) => ({type: ADD_LODGING_INFO_TO_CITY, lodgingInfo});

export const editLodgingInfo = (lodgingInfo, lodgingIndex) => ({type: EDIT_LODGING_INFO, lodgingInfo, lodgingIndex});

export const deleteLodgingInfo = (lodgingIndex) => ({type: DELETE_LODGING, lodgingIndex});

export const addPlanToCity = (plan, dateIndex, itineraryLength) => ({type: ADD_PLAN_TO_CITY, plan, dateIndex, itineraryLength});

export const editDayPlansList = (newOrder, dayPosition) => ({type: EDIT_DAY_PLANS_LIST, newOrder, dayPosition});

export const editItineraryItem = (plan, dayIndex, planIndex, dateIndex) => ({type: EDIT_ITINERARY_ITEM, plan, dayIndex, planIndex, dateIndex});

export const deleteItineraryItem = (dayIndex, planIndex) => ({type: DEELETE_ITINERARY_ITEM, dayIndex, planIndex});
