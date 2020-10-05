import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../TotalPrice';

const props = {
  income: 1000,
  outcome: 200,
};

describe('test TotalPrice component', () => {
  it('component should render correct income & outcome number', () => {
    const wrapper = shallow(<TotalPrice { ...props } />);
    expect(wrapper.find('.income span').text()).toBe('1000');
    expect(wrapper.find('.outcome span').text()).toBe('200');
  });
});