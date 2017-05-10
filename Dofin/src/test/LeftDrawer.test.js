'use strict'

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
// import { shallow } from 'enzyme'

import LeftDrawer from './LeftDrawer.js'


describe('Test LeftDrawer component', () => {

  test('renders correctly', () => {
    // const wrapper = shallow(
    //   <ListAvatarExample />
    // )
    const tree = renderer.create(
      <LeftDrawer />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })

})

