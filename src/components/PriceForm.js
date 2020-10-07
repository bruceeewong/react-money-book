import React from 'react';
import PropTypes from 'prop-types';

const defaultForm = {
  title: '',
  price: 0,
  date: '',
};

const getPayloadByMode = (mode) => {
  return mode === 'create' ? false : true;
}

class PriceForm extends React.Component {
  constructor(props) {
    super(props);
    let mode = 'create';
    if (this.props.form) {
      mode = 'edit';
    }

    const initForm = this.processForm(this.props.form);

    this.state = {
      mode,
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
    e.preventDefault();

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
    
    this.props.onFormSubmit(this.state.form, getPayloadByMode(this.state.mode));
  }

  validateForm = (form, cb) => {
    let dateReg = /^\d{4}-\d{2}-\d{2}$/;

    let message = '';
    if (!form.title || form.title.trim() === '') {
      message = '标题不能为空';
      cb(false, message);
    } else if (parseInt(form.price) <= 0) {
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
    const {onFormCancel} = this.props;
    
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

        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="form-title">日期 *</label>
            <input 
              id="form-title" 
              name="title" 
              className="form-control"
              value={form.title} 
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-price">金额 *</label>
            <input 
              id="form-price" 
              name="price" 
              className="form-control"
              value={form.price} 
              type="number" 
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-date">日期 *</label>
            <input 
              id="form-date" 
              name="date" 
              className="form-control"
              value={form.date} 
              type="date" 
              onChange={this.onChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn mr-3">提交</button>
          <button className="btn btn-secondary cancel-btn" onClick={onFormCancel}>取消</button>
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
