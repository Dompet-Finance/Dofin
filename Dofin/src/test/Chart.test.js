import 'react-native';
import 'react-dom';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe("unit testing for chart", () => {

  test("it should render some data", () => {

    class SimpleChart extends React.Component {
      constructor(props){
        super(props)
        this.state = {
          jml_category: 10
        }
      }
      render() {
        return <div>{this.state.jml_category}</div>;
      }
    }
    const wrapper = renderer.create(<SimpleChart />);
    expect(wrapper).toMatchSnapshot()
  })

})
