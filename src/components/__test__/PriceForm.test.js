import React from 'react';
import {mount} from 'enzyme';
import PriceForm from '../PriceForm';

const props = {
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn(),
};

// const propsWithItem = {
//   item: testItems[0],
//   onFormSubmit: jest.fn(),
//   onFormCancel: jest.fn(),
// };

let wrapper = null;

describe('test rendering', () => {
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />);
  });

  // it('should match snapshot', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

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
        expect(input.instance().value).toEqual("0");
      } else {
        expect(input.instance().value).toEqual('');
      }
    });
  })
});

const expectFormNotPass = (wrapper) => {
  expect(wrapper.find('.alert').length).toEqual(1);
  expect(props.onFormSubmit).not.toHaveBeenCalled();
}

const fakeEvent = (name, value) => {
  return {
    target: {
      name,
      value,
    },
  };
};

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

  // it('should submit with payload and no alert if values are valid', () => {
  //   wrapper.find('#form-title').simulate('input', val);
  //   wrapper.find('#form-price').simulate('input', val);
  //   wrapper.find('#form-date').simulate('input', val);

  //   invalidValues.forEach(val => {
  //     wrapper.find('#form-price').simulate('input', val);
  //     expectFormNotPass(wrapper);
  //   });
  // });
});
