import { PLACES_REQUEST } from '../../actions/constants';
import placesReducers from '../../reducers/placesReducers';

describe('Places Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = placesReducers(undefined, action)
    expect(newState).toEqual(0)
  })
})
