import React from 'react';
import { mount } from 'enzyme';
import CategorySelect from '../CategorySelect';
import Ionicon from 'react-ionicons';
import {categories} from '../../testData';

let props = {
  categories,
  onSelectCategory: jest.fn(),
};

let propsWithCategory = {
  categories,
  selectedCategory: categories[0],
  onSelectCategory: jest.fn(),
};
x
describe('test CategorySelect component', () => {
  it('renders with categories should render the correct items', () => {
    const wrapper = mount(<CategorySelect {...props} />);
    expect(wrapper.find('.category-item').length).toEqual(categories.length);
    expect(wrapper.find('.category-item.active').length).toEqual(0);
    const firstIcon = wrapper.find('.category-item').first().find(Ionicon);
    expect(firstIcon.length).toEqual(1);
    expect(firstIcon.props().icon).toEqual(categories[0].iconName);
  });

  it('should highlight default item', () => {
    const wrapper = mount(<CategorySelect {...propsWithCategory} />);
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true);
  });
  
  it('should highlight class and trigger callback when click the item', () => {
    const wrapper = mount(<CategorySelect {...propsWithCategory} />);
    wrapper.find('.category-item').at(1).simulate('click');
    expect(wrapper.find('.category-item').at(0).hasClass('active')).toEqual(false); // 移除默认第一项的高亮
    expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true);
    expect(propsWithCategory.onSelectCategory).toHaveBeenCalledWith(categories[1]);
  });
});
