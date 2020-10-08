import React from 'react';
import { mount } from 'enzyme';
import { Create } from '../Create';
import { parseToYearAndMonth, flattenArr, createID, TYPE_OUTCOME } from '../../utility';
import Loader from '../../components/Loader';
import { items, categories } from '../../testData';
import CategorySelect from '../../components/CategorySelect';
import PriceForm from '../../components/PriceForm';

// mock data
const testCategories = flattenArr(categories);
const testItems = flattenArr(items);
const testEditItem = items[0];

const fakeEvent = (name, value) => ({
  target: { 
    name, 
    value,
  },
});

// mock withRouter
const match = { params: { id: testEditItem.id } };
const history = { push: () => {} };
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
  getEditData: jest.fn(),
  createItem: jest.fn(),
  updateItem: jest.fn(),
};

describe('test Create page init behaviors', () => {
  it('should call getEditData action when render initially', () => {
    const wrapper = mount(
      <Create data={initData} match={match} actions={actions} />
    );
    expect(actions.getEditData).toHaveBeenCalledWith(testEditItem.id);
  });

  it('should show Loader when isLoading is true', () => {
    const wrapper = mount(
      <Create data={loadingData} match={match} actions={actions} />
    );
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

describe('test Create page in create mode', () => {
  const wrapper = mount(
    <Create data={loadedData} actions={actions} match={createMatch} history={history} />
  );

  it('should pass null to props selectedCategory for CategorySelect', () => {
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(null);
  });

  it('should pass empty object for PriceForm', () => {
    expect(wrapper.find(PriceForm).props().form).toEqual({});
  });

  it('should not trigger create action when submit form without any input', () => {
    wrapper.find('form').simulate('submit');
    expect(actions.createItem).not.toHaveBeenCalled();
  });

  it('should trigger create action when submit form with valid input', () => {
    // firstly select category
    wrapper.find('.category-item').first().simulate('click');

    const updateFields = {
      title: 'new title',
      price: 999,
      date: '2020-01-01',
    };

    // then fill in the form
    wrapper.find('#form-title').simulate('change', fakeEvent('title', updateFields.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', updateFields.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', updateFields.date));

    // lastly submit
    wrapper.find('form').simulate('submit');
    expect(actions.createItem).toHaveBeenCalled();
  });
});

describe('test Create page in edit mode', () => {
  const wrapper = mount(
    <Create data={loadedData} actions={actions} match={match} history={history} />
  );
  const selectedCategory = testCategories[testEditItem.cid];
  
  it('should pass the correct category to props selectedCategory for CategorySelect component', () => {
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(selectedCategory);
  });

  it('should call action modifyItem after modify some inputs and submit', () => {
    const updateFields = {
      title: 'new title',
      price: 999,
      date: '2020-01-01',
    };

    wrapper.find('#form-title').simulate('change', fakeEvent('title', updateFields.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', updateFields.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', updateFields.date));

    wrapper.find('form').simulate('submit');
    const expectData = {
      ...testEditItem,
      ...updateFields,
    };
    expect(actions.updateItem).toHaveBeenCalledWith(expectData, selectedCategory.id);
  });
});

