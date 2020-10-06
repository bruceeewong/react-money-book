import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MonthPicker from '../MonthPicker';

let props = {
  year: 2020,
  month: 8,
  onChange: jest.fn(),
};

let wrapper = null;

describe('test MonthPicker component', () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />);
  });

  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct year and month. show correct dropdown state', () => {
    const btn = wrapper.find('.dropdown-toggle').first();
    expect(btn.text()).toEqual('2020年 08月');

    expect(wrapper.find('.dropdown-menu').length).toEqual(0);
    expect(wrapper.state('isOpen')).toEqual(false);
    expect(wrapper.state('selectedYear')).toEqual(2020);
  });

  it('should render dropdown menu with correct select-cols and correct year&month after selected', () => {
    const btn = wrapper.find('.dropdown-toggle').first();
    btn.simulate('click');
    expect(wrapper.state('isOpen')).toEqual(true);
    expect(wrapper.find('.dropdown-menu').length).toEqual(1);

    expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9);
    expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12);
    expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2020 年');
    expect(wrapper.find('.months-range .dropdown-item.active').text()).toEqual('08 月');

    // the first year should equal to the currentYear minus 4
    expect(wrapper.find('.years-range .dropdown-item').first().text()).toEqual(`${props.year - 4} 年`);
    expect(wrapper.find('.months-range .dropdown-item').first().text()).toEqual('01 月');
  });

  it('should highlight the year&month when selected', () => {
    const btn = wrapper.find('.dropdown-toggle').first();
    btn.simulate('click');

    // select year
    wrapper.find('.years-range .dropdown-item').first().simulate('click');
    expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toBeTruthy();  // find again to avoid not rendered
    expect(wrapper.state('selectedYear')).toEqual(2016);

    // select month will close the picker and trigger callback with year & month
    wrapper.find('.months-range .dropdown-item').first().simulate('click');
    expect(wrapper.state('isOpen')).toEqual(false);
    expect(props.onChange).toHaveBeenCalledWith(2016, 1);
  });

  it('after the dropdown is shown, it should close the dropdown when click outside the dropdown menu', () => {
    const eventMap = {};
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });
    
    // run own wrapper
    wrapper = mount(<MonthPicker {...props} />);

    wrapper.find('.dropdown-toggle').simulate('click');
    expect(wrapper.state('isOpen')).toEqual(true);

    // mock dom event
    // when click inside the menu, menu still shows
    eventMap.click({
      target: ReactDOM.findDOMNode(wrapper.instance()),  // find dom in mock mode
    });
    expect(wrapper.state('isOpen')).toEqual(true);

    // when click outside the menu, menu still shows
    eventMap.click({
      target: document,
    });
    expect(wrapper.state('isOpen')).toEqual(false);
  });
});