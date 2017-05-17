import { NEW_INCOME, GET_INCOME } from '../../actions/constants';
import incomeReducer from '../../reducers/incomeReducer';

describe('Income Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = incomeReducer(undefined, action)
    expect(newState).toEqual(0)
  })

  it('should return action payload', () => {
    const action = {
      type: NEW_INCOME,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = incomeReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('should return action payload', () => {
    const action = {
      type: GET_INCOME,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = incomeReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })
})
