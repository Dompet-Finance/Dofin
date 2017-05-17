import { NEW_USER, GET_USER, DELETE_USER } from '../../actions/constants';
import notificationReducer from '../../reducers/notificationReducer';

describe('User Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual([])
  })

  it('should return empty array', () => {
    const action = {
      type: NEW_USER,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual([])
  })

  it('should return empty array', () => {
    const action = {
      type: GET_USER,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual([])
  })

  it('should return empty array', () => {
    const action = {
      type: DELETE_USER,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual([])
  })
})
