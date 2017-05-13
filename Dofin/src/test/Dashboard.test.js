'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Dashboard from '../components/Dashboard.js'

describe('Test Dashboard component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Dashboard />)
  })

  test('renders correctly', () => {
    const tree = renderer.create(
      <Dashboard />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

  test('should render overview', () => {
    const child = wrapper.find('Overview')
    expect(child).toHaveLength(1)
  })

  test('should render graph', () => {
    const child = wrapper.find('Graph')
    expect(child).toHaveLength(1)
  })

  test('should render dreams', () => {
    const child = wrapper.find('Dreams')
    expect(child).toHaveLength(1)
  })

  test('should render fap button', () => {
    const child = wrapper.find('FapButton')
    expect(child).toHaveLength(1)
  })

})

