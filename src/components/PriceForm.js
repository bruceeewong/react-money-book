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

    const { form } = this.props;
    let mode = 'create';
    if (form && form.id) {
      mode = 'edit';
    }
    this.state = {
      mode,
      validatePass: true,
      alertMsg: '',
      form: { ...this.processForm(form) },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.form.id !== prevProps.form.id) {
      const { form } = this.props;
      const result = this.processForm(form);
      this.setState({
        form: {...result},
      });
    }
  }

  processForm = (form) => {
    if (typeof form !== 'object') {
      return defaultForm;
    }
    let result = {...form}
    // 如果缺少绑定字段，填补
    Object.keys(defaultForm).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(form, key)) {
        result[key] = defaultForm[key];
      }
    })
    return result;
  }

  submitForm = (e) => {
    e.preventDefault();

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
    let {name, value, type} = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

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
      validatePass,
      form,
      alertMsg,
    } = this.state;

    return (
      <section>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="form-title">标题 *</label>
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
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">¥</span>
              </div>
              <input 
                id="form-price" 
                name="price" 
                className="form-control"
                value={form.price} 
                type="number" 
                onChange={this.onChange}
              />
            </div>
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

        {
          !validatePass &&
          <div className="alert alert-danger mt-3">{alertMsg}</div>
        }
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
