'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import LeftDrawer from '../components/LeftDrawer.js'

describe('Test LeftDrawer component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LeftDrawer />)
  })

  test('renders correctly', () => {
    const tree = renderer.create(
      <LeftDrawer />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

  test('should have menu button in list', () => {
    expect(wrapper).toHaveLength(1)

    const button = wrapper.find('Button')
    expect(button).toHaveLength(3)
  })

  test('should handle navigation on button clicked', () => {
    const button = wrapper.find('Button').first()
    const prop = button.prop('onPress')
    expect(prop).toBeInstanceOf(Function)
    expect(prop()).toEqual(true) // fake
  })

})

