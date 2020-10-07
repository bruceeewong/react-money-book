import React from 'react';
import PropTypes from 'prop-types';

const defaultForm = {
  title: '',
  price: 0,
  date: '',
};

class PriceForm extends React.Component {
  constructor(props) {
    super(props);
    const initForm = this.processForm(this.props.form);

    this.state = {
      isInit: true,
      validatePass: false,
      alertMsg: '',
      form: { ...initForm },
    };
  }

  processForm = (form) => {
    if (typeof form !== 'object') {
      return defaultForm;
    }
    let initialForm = {};
    Object.keys(defaultForm).forEach(key => {
      initialForm[key] = form[key];
    });
    return initialForm;
  }

  submitForm = (e) => {
    if (this.state.isInit) {
      this.setState({
        isInit: false,
      });
    }

    let validatePass, alertMsg;
    this.validateForm(this.state.form, (result, msg) => {
      validatePass = result;
      alertMsg = msg;
    });
    
    this.setState({
      validatePass,
      alertMsg,
    });

    if (!validatePass) return;
    
    this.props.onFormSubmit(this.state.form);
  }

  validateForm = (form, cb) => {
    let dateReg = /^\d{4}-\d{2}-\d{2}$/;

    let message = '';
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
      message = '表单校验通过';
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
  form: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onFormCancel: PropTypes.func,
};

export default PriceForm;
