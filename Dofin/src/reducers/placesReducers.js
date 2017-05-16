import * as ActionTypes from '../actions/constants';

const placesRequest = (state = [], dataPlaces) => {
  const places = dataPlaces.map(place => ({
    placeName : place.name
  }))
  const newState = places;
  return newState;
}

const placesReducer = (state = 0, action) => {
  switch(action.type) {
    case ActionTypes.PLACES_REQUEST: return placesRequest(state, action.payload)
    default: return state;
  }
}

export default placesReducer;
