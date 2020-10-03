/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {padMonth, range, yearNearby} from '../utility';

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  // 切换下拉菜单显示
  toggleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {year, month} = this.props;
    const {isOpen} = this.state;
    const monthRange = range(12, 1);
    const yearRange = yearNearby(year, 4);

    return (
      <div className="dropdown month-picker-component">
        <h4>选择月份</h4>
        <button 
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}  
        >
          {`${year}年 ${padMonth(month)}月`}
        </button>

        {
          isOpen && 
          <div 
            className="dropdonw-menu"
            style={{ display: 'block' }}
          >
            <div className="row">
              <div className="col border-right">
                {
                  yearRange.map(yearNum => (
                    <a 
                      key={yearNum}
                      className="dropdown-item"  
                    >
                      {yearNum} 年
                    </a>
                  ))
                }
              </div>
              <div className="col">
              {
                  monthRange.map(monthNum => (
                    <a 
                      key={monthNum}
                      className="dropdown-item"  
                    >
                      {padMonth(monthNum)} 月
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default MonthPicker;