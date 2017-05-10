'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Notifications from '../components/Notifications.js'

describe('Test Notifications component', () => {

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

  test('should render appbar', () => {
    const child = wrapper.find('AppBar')
    expect(child).toHaveLength(1)
  })

  test('should render notification list', () => {
    const child = wrapper.find('NotificationList')
    expect(child).toHaveLength(1)
  })

})

