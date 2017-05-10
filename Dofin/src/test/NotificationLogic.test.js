'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Notifications from '../components/Notifications.js'

describe('Test Notification Logic component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Notifications />)
  })

  test('renders correctly', () => {
    const tree = renderer.create(
      <Notifications />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

  test('should show up overlimit warning in notification', () => {
    const fakeState = {
      income: 1000,
      expense: 2000,
    }
    wrapper.setState(fakeState)
    
    expect(wrapper).toMatchSnapshot();
  })

})

