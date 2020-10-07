import React from 'react';
import { shallow } from 'enzyme';
import PriceList from '../PriceList';
import {items, categories} from '../../testData';
import IonIcon from 'react-ionicons';

const itemsWithCategory = items.map(item => {
  const cpItem = {...item};
  cpItem.category = categories.findIndex(c => c.id === cpItem.cid);
  return cpItem;
});

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
};

let wrapper;
describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />);
  });

  it('should render the component to match snapshot', () => {
    // 检测是否改动文件
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length);
  });

  it('should render correct icon and price for each item', () => {
    const iconList = wrapper.find('.list-group-item').first().find(IonIcon);
    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().icon)
      .toEqual(itemsWithCategory[0].category.iconName);
  });

  it('should trigger the correct function callback', () => {
    const firstItem = wrapper.find('.list-group-item').first();
    // test modify button click
    firstItem.find('a').first().simulate('click');
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0]);
    // test delete button click
    firstItem.find('a').last().simulate('click');
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0]);
  });

  it('should show placeholder text if no items', () => {
    const propsWithNoItems = {
      items: [],
      onModifyItem: jest.fn(),
      onDeleteItem: jest.fn(),
    }
    let wrapper2 = shallow(<PriceList {...propsWithNoItems} />);

    expect(wrapper2.find('.placeholder').length).toEqual(1);
  })
});