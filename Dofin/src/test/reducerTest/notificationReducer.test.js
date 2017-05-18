import { POST_NOTIFICATION, GET_NOTIFICATIONS } from '../../actions/constants';
import notificationReducer from '../../reducers/notificationReducer';

describe('Notification Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual([])
  })

  it('should return action payload', () => {
    const action = {
      type: POST_NOTIFICATION,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: GET_NOTIFICATIONS,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })
})
