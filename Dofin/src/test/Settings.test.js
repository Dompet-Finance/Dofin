'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Settings from '../components/Settings.js'

describe('Test Settings component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Settings />)
  })

  test('renders correctly', () => {
    const tree = renderer.create(
      <Settings />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

  test('should render appbar', () => {
    const child = wrapper.find('AppBar')
    expect(child).toHaveLength(1)
  })

  test('should render each setting item', () => {
    const child = wrapper.find('SettingItem').first()
    expect(child).toHaveLength(1)
  })

  test('should change state on change setting', () => {
    // manage state
  })

})

