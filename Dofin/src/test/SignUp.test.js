import React from 'react';
import { shallow } from 'enzyme';
import {
  View,
  TextInput,
  Button
} from 'react-native';

import SignUpForm from '../components/SignUpForm';

describe('<SignUp />', () => {
  const wrapper = shallow(<SignUpForm />);

  it('should be a view component', () => {

    expect(wrapper.type()).toEqual(View);
  });

  it('should pass a selected value to the onChange handler', () => {
    const value = 'This is TDD bruh';
    const onChange = jest.fn();
    const wrapper = shallow(
      <TextInput onChange={onChange} />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.find('TextInput').simulate('change', {
      target: { value },
    });

    expect(onChange).toBeCalledWith({target: {value: 'This is TDD bruh'}});
  });

  it('should render TextInput', () => {

    expect(wrapper.find(TextInput)).toHaveLength(2)
  });

  it('should render Button', () => {

    expect(wrapper.find(Button)).toHaveLength(1)
  });

  test('it should simulate click save on button', () => {
    const button = wrapper.find(Button);
    const prop = button.prop('onPress');
    expect(prop).toBeInstanceOf(Function);
    expect(prop()).toEqual(true)
  })
});
