import { NEW_DREAM, GET_DREAM, UPDATE_DREAM } from '../../actions/constants';
import dreamReducer from '../../reducers/dreamReducer';

describe('Dream Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = dreamReducer(undefined, action)
    expect(newState).toEqual('')
  })

  it('should return action payload', () => {
    const action = {
      type: NEW_DREAM,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = dreamReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: GET_DREAM,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = dreamReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: UPDATE_DREAM,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = dreamReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })
})
