import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Home } from '../Home';

import PriceList from '../../components/PriceList';
import { Tabs, Tab } from '../../components/Tabs';
import MonthPicker from '../../components/MonthPicker';
import CreateBtn from '../../components/CreateBtn';
import Loader from '../../components/Loader';
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  flattenArr,
} from '../../utility';

import { items, categories } from '../../testData';

// mock data
const testCategories = flattenArr(categories);
const testItems = flattenArr(items);

const fakeEvent = (name, value) => ({
  target: { 
    name, 
    value,
  },
});

// mock withRouter
const history = { push: jest.fn() };
const createMatch = { params: { id: '' } };

// mock AppContext
const initData = {
  categories: {},
  items: {},
  isLoading: false,
  currentDate: parseToYearAndMonth(),
};

const loadedData = {
  categories: testCategories,
  items: testItems,
  isLoading: false,
  currentDate: parseToYearAndMonth(),
};

const loadingData = {
  ...initData,
  isLoading: true,
};

const actions = {
  getInitData: jest.fn(),
  createItem: jest.fn(),
  deleteItem: jest.fn(),
  updateItem: jest.fn(),
  selectNewMonth: jest.fn(),
};

describe('test Home page init behaviors', () => {
  it('should render the default layout', () => {
    const wrapper = mount(
      <Home data={initData} history={history} actions={actions} />
    );
    expect(wrapper.find(PriceList).length).toEqual(1);

    expect(wrapper.find(Tabs).length).toEqual(1);
    expect(wrapper.find(Tabs).props().activeIndex).toEqual(0);
    expect(wrapper.find(Tab).length).toEqual(2);

    expect(wrapper.find(CreateBtn).length).toEqual(1);

    expect(wrapper.find(MonthPicker).props().year).toEqual(initData.currentDate.year);
    expect(wrapper.find(MonthPicker).props().month).toEqual(initData.currentDate.month);

    expect(wrapper.find(PriceList).props().items.length).toEqual(0);
  });

  it('should call action getInitData when init', () => {
    mount(
      <Home data={initData} history={history} actions={actions} />
    );
    expect(actions.getInitData).toHaveBeenCalled();
  });

  it('should show Loader when Loading', () => {
    const wrapper = mount(
      <Home data={loadingData} history={history} actions={actions} />
    );
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('should hide Loader and pass items to PriceList props items when loaded', () => {
    const wrapper = mount(
      <Home data={loadedData} history={history} actions={actions} />
    );
    expect(wrapper.find(Loader).length).toEqual(0);
    expect(wrapper.find(PriceList).props().items.length).toEqual(items.length);
  });
});

describe('tets Home page behaviors', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Home data={loadedData} history={history} actions={actions} />
    );
  });

  it('should switch to chart view and hide PirceList when click view tab', () => {
    wrapper.find('.nav-link').last().simulate('click');
    expect(wrapper.find(Tabs).props().activeIndex).toEqual(1);
    expect(wrapper.find('.chart-title').length).toEqual(1);
    expect(wrapper.find(PriceList).length).toEqual(0);
  });

  it('should display items with correct year&month after select', () => {
    wrapper.find('.dropdown-toggle').simulate('click');
    wrapper.find('.months-range .dropdown-item').at(9).simulate('click'); // select month 10

    const { year, month } = wrapper.find(MonthPicker).props();
    expect(month).toEqual(10);
    expect(actions.selectNewMonth).toHaveBeenCalledWith(year, month);
  });

  it('should route to create page when click create btn', () => {
    wrapper.find(CreateBtn).simulate('click');
    expect(history.push).toHaveBeenCalledWith(`/create`);
  });

  it('should trigger action deleteItem when click delete btn of any item', () => {
    wrapper.find('.list-group-item .delete-btn').first().simulate('click');
    expect(actions.deleteItem).toHaveBeenCalled();
  });

  it('should route to edit page with id when click update btn of any item', () => {
    const firstItemId = items[0].id;
    wrapper.find('.list-group-item .update-btn').first().simulate('click');
    expect(history.push).toHaveBeenCalledWith(`/edit/${firstItemId}`);
  });

  // it('should switch to create page after click the create btn', () => {
  //   expect(wrapper.find(PriceList).props().items.length).toEqual(0);
  //   // wrapper.find(CreateBtn).simulate('click');
  //   // expect(location.pathname).toEqual('/create');
  // })
});
