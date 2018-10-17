export const SAVE_TRIP = 'SAVE_TRIP';
export const SELECTED_TRIP = 'SELECTED_TRIP';
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE';

export const addTrip = (trip) => ({type: SAVE_TRIP, trip});

export const selectTripFromMenu = (tripId) => ({type: SELECTED_TRIP, tripId});

export const updateHeaderTitle = (tripName) => ({type: UPDATE_HEADER_TITLE, tripName});

