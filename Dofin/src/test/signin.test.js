import React from'react'
import {
  View,
  Button,
 } from 'react-native';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import SignIn from '../components/SignIn';

describe('<SignIn />', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SignIn />)
  })

  test('it should render successfull', () => {
    const signin = renderer.create(
      <SignIn />
    ).toJSON();
    expect(SignIn).toMatchSnapshot();
  })

  test('should have button for signin', () => {
    expect(wrapper).toHaveLength(1)

    const button = wrapper.find('Button')
    expect(button).toHaveLength(1)
  })
  test('it should pressButton save on button', () => {
    const button = wrapper.find('Button');
    const prop = button.prop('onPress');
    expect(prop).toBeInstanceOf(Function);
    expect(prop()).toEqual(true)
  })
});
