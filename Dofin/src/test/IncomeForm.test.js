import React from 'react';
import { shallow } from 'enzyme';
import {
  View,
  TextInput,
  Button
} from 'react-native';

import IncomeForm from '../components/IncomeForm';

describe('<IncomeForm />', () => {
  const wrapper = shallow(<IncomeForm />);

  it('should render a Text', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should be a view component', () => {

    expect(wrapper.type()).toEqual(View);
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
