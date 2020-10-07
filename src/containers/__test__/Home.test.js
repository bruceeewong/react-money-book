import React from 'react';
import {Router} from 'react-router-dom';
import { mount } from 'enzyme';
import Home from '../Home';

import PriceList from '../../components/PriceList';
import ViewTab from '../../components/ViewTab';
import MonthPicker from '../../components/MonthPicker';
import CreateBtn from '../../components/CreateBtn';
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
} from '../../utility';

let wrapper = null;
let currentDate = parseToYearAndMonth('2020/09/01');

describe('tets Home container component', () => {
  beforeEach(() => {
    wrapper = mount(<Router><Home /></Router>);
  });

  it('should render the default layout', () => {
    expect(wrapper.find(PriceList).length).toEqual(1);
    expect(wrapper.find(ViewTab).length).toEqual(1);
    expect(wrapper.find(CreateBtn).length).toEqual(1);
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year);
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month);
    expect(wrapper.find(PriceList).props().items.length).toEqual(0);
  });

  it('should switch to chart view when click view tab', () => {
    wrapper.find('.nav-item a').last().simulate('click');
    expect(wrapper.find('.chart-title').length).toEqual(1);
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW);
  });

  it('should display items with correct year&month after select', () => {
    wrapper.find('.dropdown-toggle').simulate('click');
    wrapper.find('.months-range .dropdown-item').at(9).simulate('click'); // select month 10
    expect(wrapper.find(MonthPicker).props().month).toEqual(10);
    expect(wrapper.find(PriceList).props().items.length).toEqual(2);
  });

  it('should switch to create page after click the create btn', () => {
    expect(wrapper.find(PriceList).props().items.length).toEqual(0);
    wrapper.find(CreateBtn).simulate('click');
    expect(location.pathname).toEqual('/create');
  })
});
