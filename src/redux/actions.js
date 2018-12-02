export const SAVE_TRIP = 'SAVE_TRIP';
export const SELECTED_TRIP = 'SELECTED_TRIP';
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE';
export const SELECTED_CITY = 'SELECTED_CITY';
export const ADD_FLIGHT_TO_CITY = 'ADD_FLIGHT_TO_CITY';
export const DELETE_FLIGHT = 'DELETE_FLIGHT';
export const ADD_LODGIN_INFO_TO_CITY = 'ADD_LODGIN_INFO_TO_CITY';

export const addTrip = (trip) => ({type: SAVE_TRIP, trip});

export const selectTripFromMenu = (tripId) => ({type: SELECTED_TRIP, tripId});

export const selectedCityFromTrip = (cityIndex) => ({type: SELECTED_CITY, cityIndex});

export const updateHeaderTitle = (title) => ({type: UPDATE_HEADER_TITLE, title});

export const addFlightToCity = (flight) => ({type: ADD_FLIGHT_TO_CITY, flight});

export const deleteFlightFromCity = () => ({type: DELETE_FLIGHT});

export const addLodginInfoToCity = (lodginInfo) => ({type: ADD_LODGIN_INFO_TO_CITY, lodginInfo});
