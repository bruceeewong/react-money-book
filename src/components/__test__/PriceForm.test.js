import React from 'react';
import {mount} from 'enzyme';
import PriceForm from '../PriceForm';

const props = {
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn(),
};

const fakeForm = {
  title: '购物',
  price: '100',
  date: '2020-10-07',
};

const expectFormNotPass = (wrapper) => {
  expect(wrapper.find('.alert').length).toEqual(1);
  expect(props.onFormSubmit).not.toHaveBeenCalled();
}

const fakeEvent = (name, value) => ({
  target: { 
    name, 
    value,
  },
});

const propsWithForm = {
  form: fakeForm,
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn(),
};

let wrapper = null;
let wrapperWithForm = null;

describe('test rendering', () => {
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />);
    wrapperWithForm = mount(<PriceForm {...propsWithForm} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapperWithForm).toMatchSnapshot();
  });

  it('should render 3 input and 1 form', () => {
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('.alert').length).toEqual(0);
  });
});

describe('test control default value', () => {
  it('should be empty if no item props', () => {
    wrapper.find('input').forEach(input => {
      const ins = input.instance();
      let val = ins.value;
      if (ins.name === 'price') {
        expect(val).toEqual("0");
      } else {
        expect(val).toEqual('');
      }
    });
  });

  it('should display props value if props form is given', () => {
    expect(wrapperWithForm.find('#form-title').instance().value).toEqual(fakeForm.title);
    expect(wrapperWithForm.find('#form-price').instance().value).toEqual(fakeForm.price);
    expect(wrapperWithForm.find('#form-date').instance().value).toEqual(fakeForm.date);
  });
});

describe('test form validation', () => {
  it('should stop submit and alert if submit empty form', () => {
    wrapper.find('form').simulate('submit');
    expectFormNotPass(wrapper);
  });

  it('should stop submit and alert if submit invalid price', () => {
    let invalidValues = [-1, 0];
    invalidValues.forEach(val => {
      wrapper.find('#form-price').simulate('change', fakeEvent('price', val));
      wrapper.find('form').simulate('submit');
      expectFormNotPass(wrapper);
      expect(wrapper.find('.alert').text()).toEqual('价格必须大于0');
    });
  });

  it('should stop submit and alert if submit invalid date', () => {
    let invalidValues = ['', '2020/10'];

    invalidValues.forEach(date => {
      wrapper.find('#form-date').simulate('change', fakeEvent('date', date));
      wrapper.find('form').simulate('submit');
      expectFormNotPass(wrapper);
    });
  });
});

describe('test create mode', () => {
  it('should be edit mode when pass in prop form', () => {
    expect(wrapper.state('mode')).toEqual('create');
  });

  it('create mode: should submit with [form, false] and no alert if values are valid', () => {
    wrapper.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    wrapper.find('form').simulate('submit');
    
    expect(props.onFormSubmit).toHaveBeenCalledWith(fakeForm, false);
  });
});

describe('test edit mode', () => {
  it('should be edit mode when pass in prop form', () => {
    expect(wrapperWithForm.state('mode')).toEqual('edit');
  });

  it('should submit with [form, true] and no alert if values are valid', () => {
    wrapperWithForm.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapperWithForm.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapperWithForm.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    wrapperWithForm.find('form').simulate('submit');
    
    expect(propsWithForm.onFormSubmit).toHaveBeenCalledWith(fakeForm, true);
  });
});
