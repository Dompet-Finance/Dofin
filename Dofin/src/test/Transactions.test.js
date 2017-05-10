'use strict'

import 'react-native'
import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Transactions from '../components/Transactions.js'

describe('Test Transactions component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Transactions />)
  })

  test('renders correctly', () => {
    const tree = renderer.create(
      <Transactions />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

  test('should render appbar', () => {
    const child = wrapper.find('AppBar')
    expect(child).toHaveLength(1)
  })

  test('should render category list', () => {
    const child = wrapper.find('CategoryList')
    expect(child).toHaveLength(1)
  })

  test('should render month option', () => {
    const child = wrapper.find('MonthOption')
    expect(child).toHaveLength(1)
  })

  test('should update if month has changed', () => {
  })

})