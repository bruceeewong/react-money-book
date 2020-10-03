/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {padMonth, range, yearNearby, toggleClass} from '../utility';

const activeToggleItem= (input, expect) => {
  return toggleClass(input, expect, 'dropdown-item active', 'dropdown-item');
};

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
        {/* 下拉按钮部分 */}
        <h4>选择月份</h4>
        <button 
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}  
        >
          {`${year}年 ${padMonth(month)}月`}
        </button>

        {/* 下拉菜单部分 */}
        {
          isOpen && 
          <div 
            className="dropdonw-menu"
            style={{ display: 'block' }}
          >
            <div className="row">
              {/* 下拉菜单-年份列 */}
              <div className="col border-right">
                {
                  yearRange.map(yearNum => (
                    <a 
                      key={yearNum}
                      href="#"
                      className={activeToggleItem(yearNum, year)}
                    >
                      {yearNum} 年
                    </a>
                  ))
                }
              </div>

              {/* 下拉菜单-月份列 */}
              <div className="col">
              {
                  monthRange.map(monthNum => (
                    <a 
                      key={monthNum}
                      href="#"
                      className={activeToggleItem(monthNum, month)}
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