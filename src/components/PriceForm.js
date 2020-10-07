import React from 'react';
import PropTypes from 'prop-types';

class PriceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInit: true,
      validatePass: false,
      alertMsg: '',
      form: {
        title: '',
        price: 0,
        date: '',
      },
    };
  } 

  submitForm = (e) => {
    console.log(this.state.form);

    if (this.state.isInit) {
      this.setState({
        isInit: false,
      });
    }

    this.validateForm(this.state.form, (result, msg) => {
      this.setState({
        validatePass: result,
        alertMsg: msg,
      });
    });

    if (!this.state.validatePass) {
      return;
    }
    
    return;
  }

  validateForm = (form, cb) => {
    let dateReg = /^\d{4}\/\d{2}\/\d{2}$/;

    let message = '表单校验通过';
    if (parseInt(form.price) <= 0) {
      message = '价格必须大于0';
      cb(false, message);
    } else if (!form.date) {
      message = '日期不能为空';
      cb(false, message);
    } else if (!dateReg.test(form.date)) {
      message = '日期格式应为 YYYY/mm/dd';
      cb(false, message);
    } else {
      cb(true, message);
    }
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  }

  render() {
    const {
      isInit, 
      validatePass,
      form,
      alertMsg,
    } = this.state;

    return (
      <section>
        {
          !isInit &&
          !validatePass &&
          <div className="alert alert-danger">{alertMsg}</div>
        }
        <form onSubmit={(e) => { this.submitForm(e) }}>
          <input id="form-title" name="title" value={form.title} onChange={this.onChange} />
          <input id="form-price" name="price" value={form.price} type="number" onChange={this.onChange} />
          <input id="form-date" name="date" value={form.date} type="date" onChange={this.onChange} />
        </form>
      </section>
    );
  }
}

PriceForm.propTypes = {
  items: PropTypes.array,
  onFormSubmit: PropTypes.func,
  onFormCancel: PropTypes.func,
};

export default PriceForm;
