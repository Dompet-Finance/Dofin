import { POST_IMAGE } from '../../actions/constants';
import cameraReducer from '../../reducers/cameraReducer';

describe('Camera Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = cameraReducer(undefined, action)
    expect(newState).toEqual({
      loading: false,
      getItems: []
    })
  })

  it('loaded the data', () => {
    const action = {
      type: POST_IMAGE,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = cameraReducer(undefined, action)
    expect(newState).toEqual({
      loading: false,
      getItems: action.payload
    })
  })

  it('should set loading', () => {
    const action = {
      type: 'SET_LOADING',
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = cameraReducer(undefined, action)
    expect(newState).toEqual({
      loading: action.payload,
      getItems: []
    })
  })

  it('should reset items', () => {
    const action = {
      type: 'RESET_ITEMS',
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = cameraReducer(undefined, action)
    expect(newState).toEqual({
      loading: false,
      getItems: []
    })
  })
})
