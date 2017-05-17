import { NEW_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../actions/constants';
import categoryReducer from '../../reducers/categoryReducer';

describe('Category Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = categoryReducer(undefined, action)
    expect(newState).toEqual('')
  })

  it('should return action payload', () => {
    const action = {
      type: NEW_CATEGORY,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = categoryReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: GET_CATEGORY,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = categoryReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: UPDATE_CATEGORY,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = categoryReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: DELETE_CATEGORY,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = categoryReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })
})
