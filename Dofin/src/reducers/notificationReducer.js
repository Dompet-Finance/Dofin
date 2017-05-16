import * as ActionTypes from '../actions/constants';

const notificationReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.POST_NOTIFICATION: return (state, action.payload)
    case ActionTypes.GET_NOTIFICATIONS: return action.payload
    default: return state;
  }
}

export default notificationReducer;
