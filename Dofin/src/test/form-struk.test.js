import React from 'react';
import renderer from 'react-test-renderer'
import {
  View,
  TextInput,
  Button
} from 'react-native';
import { shallow } from 'enzyme'

import FormStruk from '../components/FormStruk.js'

describe('form struk testing', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<FormStruk/>)
  })

  test('it should render successfull', () => {
    const formStruk = renderer.create(
      <FormStruk />
    ).toJSON();
    expect(formStruk).toMatchSnapshot();
  })

  test('should have menu button in list', () => {
    expect(wrapper).toHaveLength(1)

    const button = wrapper.find('Button')
    expect(button).toHaveLength(1)
  })

  test('it should simulate click save on button', () => {
    const button = wrapper.find('Button');
    const prop = button.prop('onPress');
    expect(prop).toBeInstanceOf(Function);
    expect(prop()).toEqual(true)
  })
})
