import React from'react'
import {
  View,
  Button
 } from 'react-native';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import FormInputDreams from '../components/FormInputDreams';

describe('<FormInputDreams />', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<FormInputDreams/>)
  })

  test('it should render successfull', () => {
    const formStruk = renderer.create(
      <FormInputDreams />
    ).toJSON();
    expect(formStruk).toMatchSnapshot();
  })

  test('should have button for submit dreams', () => {
    expect(wrapper).toHaveLength(1)

    const button = wrapper.find('Button')
    expect(button).toHaveLength(1)
  })
  test('it should testClick save on button', () => {
    const button = wrapper.find('Button');
    const prop = button.prop('onPress');
    expect(prop).toBeInstanceOf(Function);
    expect(prop()).toEqual(true)
  })
});
