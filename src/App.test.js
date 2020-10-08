import React from 'react';
import mockAxios from './__mocks__/axios';
import { categories, items } from './testData'; 
import { mount } from 'enzyme';

import App from './App';

// https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe('test App init behaviors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('check home state when init', async () => {
    const wrapper = mount(<App />);
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    await waitForAsync();
    const currentState = wrapper.instance().state;
    expect(Object.keys(currentState.items).length).toEqual(items.length);
    expect(Object.keys(currentState.categories).length).toEqual(categories.length);
  });

  test('getEditData with init data in create mode', async () => {
    // send 2 xhr
    const wrapper = mount(<App />);
    await waitForAsync();
    await wrapper.instance().actions.getEditData();
    expect(mockAxios.get).toHaveBeenCalledTimes(2);   // categories & edit item
  });

  test('getEditData without init data in create mode', async () => {
    // send 2 xhr
    const wrapper = mount(<App />);
    await waitForAsync();
    // without init data
    wrapper.setState({
      categories: {},
      items: {},
    });
    // send 1 xhr
    await wrapper.instance().actions.getEditData();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
    expect(mockAxios.get).toHaveBeenLastCalledWith('/categories');
  });

  test('getEditData with init data in edit mode', async () => {
    // send 2 xhr
    const wrapper = mount(<App />);
    await waitForAsync();

    const editId = items[0].id;
    await wrapper.instance().actions.getEditData(editId);
    expect(mockAxios.get).toHaveBeenCalledTimes(2);   // no addition xhr because of cache design
  });

  test('getEditData with new item id & init data in edit mode', async () => {
    // send 2 xhr
    const wrapper = mount(<App />);
    await waitForAsync();
    
    const editId = 'testID';  // customize in mockAxios module
    await wrapper.instance().actions.getEditData(editId);
    // it will send xhr to fetch item with the id if no match in current state
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    const currentState = wrapper.instance().state;
    expect(currentState.items.hasOwnProperty(editId)).toBeTruthy();
  })
});