import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios'
import sinon from 'sinon'
import { equal } from 'assert'

import { getDream } from '../../actions';

const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'
const mockStore = configureMockStore([thunk]);

it('failed request', function (done) {
  moxios.withMock(function () {
    let onFulfilled = sinon.spy()
    axios.get('/dreams/59158e804412792833f91138').then(onFulfilled)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {
          id: `59158e804412792833f91138`, name: 'name'
        }
      }).then(function () {
        equal(onFulfilled.called, false)
        done()
      })
    })
  })
})

it('success request', function (done) {
  moxios.withMock(function () {
    let onFulfilled = sinon.spy()
    axios.get('/dreams/59158e804412792833f91138').then(onFulfilled)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: `59158e804412792833f91138`, name: 'name'
        }
      }).then(function () {
        equal(onFulfilled.called, true)
        done()
      })
    })
  })
})
