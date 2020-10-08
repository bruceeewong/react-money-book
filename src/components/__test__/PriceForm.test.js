import React from 'react';
import {mount} from 'enzyme';
import PriceForm from '../PriceForm';
import {createID} from '../../utility';

let props = {
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn(),
};

const fakeForm = {
  id: createID(),
  title: '购物',
  price: '100',
  date: '2020-10-07',
};

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

const expectFormNotPass = (wrapper) => {
  expect(wrapper.find('.alert').length).toEqual(1);
  expect(props.onFormSubmit).not.toHaveBeenCalled();
}

let wrapper = null;
let wrapperWithForm = null;

describe('test PriceForm rendering', () => {
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

describe('test PriceForm control default value', () => {
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

describe('test PriceForm controlled input', () => {
  it('should convert price from string to input in state', () => {
    const priceInput = wrapper.find('#form-price');
    priceInput.simulate('change', fakeEvent('price', '999'));
    expect(wrapper.state('form').price).toEqual(999);
  });

  it('should be 0 when price input is cleared by user', () => {
    const priceInput = wrapper.find('#form-price');
    priceInput.simulate('change', fakeEvent('price', ''));
    expect(wrapper.state('form').price).toEqual(0);
  });

  it('should convert string like 01 to number 1 in state', () => {
    const priceInput = wrapper.find('#form-price');
    priceInput.simulate('change', fakeEvent('price', '01'));
    expect(wrapper.state('form').price).toEqual(1);
  });
});

describe('test PriceForm form validation', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />);
  });

  it('should stop submit and alert if submit empty form', () => {
    wrapper.find('form').simulate('submit');
    expectFormNotPass(wrapper);
  });

  it('should stop submit and alert if submit invalid title', () => {
    wrapper.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    let invalidValues = [''];
    invalidValues.forEach(val => {
      wrapper.find('#form-title').simulate('change', fakeEvent('title', val));
      wrapper.find('form').simulate('submit');
      expectFormNotPass(wrapper);
      expect(wrapper.find('.alert').text()).toEqual('标题不能为空');
    });
  });

  it('should stop submit and alert if submit invalid price', () => {
    wrapper.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    let invalidValues = [-1, 0];
    invalidValues.forEach(val => {
      wrapper.find('#form-price').simulate('change', fakeEvent('price', val));
      wrapper.find('form').simulate('submit');
      expectFormNotPass(wrapper);
      expect(wrapper.find('.alert').text()).toEqual('价格必须大于0');
    });
  });

  it('should stop submit and alert if submit invalid date', () => {
    wrapper.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));

    let invalidValues = ['', '2020/10'];

    invalidValues.forEach(date => {
      wrapper.find('#form-date').simulate('change', fakeEvent('date', date));
      wrapper.find('form').simulate('submit');
      expectFormNotPass(wrapper);
    });
  });
});

describe('test PriceForm create mode', () => {
  it('should be edit mode when pass in prop form', () => {
    expect(wrapper.state('mode')).toEqual('create');
  });

  it('create mode: should submit with [form, false] and no alert if values are valid', () => {
    wrapper.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    wrapper.find('form').simulate('submit');
    
    const result = {
      title: fakeForm.title,
      price: fakeForm.price * 1,
      date: fakeForm.date,
    };
    expect(props.onFormSubmit).toHaveBeenCalledWith(result, false);
  });
});

describe('test PriceForm edit mode', () => {
  it('should be edit mode when pass in prop form', () => {
    expect(wrapperWithForm.state('mode')).toEqual('edit');
  });

  it('should submit with [form, true] and no alert if values are valid', () => {
    wrapperWithForm.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapperWithForm.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapperWithForm.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    wrapperWithForm.find('form').simulate('submit');
    const expectForm = {
      ...fakeForm,
      price: fakeForm.price * 1,
    };
    expect(propsWithForm.onFormSubmit).toHaveBeenCalledWith(expectForm, true);
  });
});

describe('test PriceForm button', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />);
  });
  
  it('should trigger submit event after click submit button', () => {
    wrapper.find('#form-title').simulate('change', fakeEvent('title', fakeForm.title));
    wrapper.find('#form-price').simulate('change', fakeEvent('price', fakeForm.price));
    wrapper.find('#form-date').simulate('change', fakeEvent('date', fakeForm.date));

    wrapper.find('.submit-btn').simulate('click');
    const result = {
      title: fakeForm.title,
      price: fakeForm.price * 1,
      date: fakeForm.date,
    };
    expect(props.onFormSubmit).toHaveBeenCalledWith(result, false);
  });

  it('should trigger cancel event after click submit button', () => {
    wrapper.find('.cancel-btn').simulate('click');
    expect(props.onFormCancel).toHaveBeenCalled();
  });
});