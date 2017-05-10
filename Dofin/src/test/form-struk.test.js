import React from 'react';
import renderer from 'react-test-renderer'
import {
  View,
  TextInput,
  Button
} from 'react-native';

import FormStruk from '../components/FormStruk.js'

describe('form struk testing', () => {
  test('it should render successfull', () => {
    const formStruk = renderer.create(
      <FormStruk />
    ).toJSON();
    expect(formStruk).toMatchSnapshot();
  })

  test('it should simulate click save on button', () => {
    const saveStruk = renderer.create(
      <Button/>
    )
  })
})
