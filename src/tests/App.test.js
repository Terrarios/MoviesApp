
import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';


test('should be rendered App', () => {

  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();

});

