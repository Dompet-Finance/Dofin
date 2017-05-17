import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { imgPostRequest } from '../../actions';
import { POST_IMAGE } from '../../actions/constants';

const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com';

const mockStore = configureMockStore([thunk]);

describe('camera actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(`should dispatch loading and post request`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: 'success', status: '200' },
      });
    });
    const expectedActions = [
      { payload: false, type: 'SET_LOADING'},
      { payload: [{item: '', price: ''}], type: POST_IMAGE },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(imgPostRequest('data'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
