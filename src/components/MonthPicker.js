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
      selectedYear: this.props.year,
      selectedMonth: this.props.month,
    };
  }

  componentDidMount() {
    // 添加点击选择框之外也能关闭框的事件
    document.addEventListener('click', this.handleClick, false);
  }
  componentWillUnmount() {
    // 卸载事件
    document.addEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    // 点击dropdown相关的dom不会关闭选择面板
    if (!this.node || this.node.contains(e.target)) {
      return;
    }

    this.setState({
      isOpen: false,
    });
  }

  // 切换下拉菜单显示
  toggleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  selectYear = (e, yearNum) => {
    e.preventDefault();
    this.setState({
      selectedYear: yearNum,
    });
  }

  // 点击月份触发回调
  selectMonth = (e, monthNum) => {
    e.preventDefault();
    this.setState({
      selectedMonth: monthNum,
      isOpen: false,
    });

    // 触发 onChange 回调
    this.props.onChange(this.state.selectedYear, monthNum);
  }

  render() {
    const {year} = this.props;
    const {selectedYear, selectedMonth, isOpen} = this.state;
    const monthRange = range(12, 1);
    const yearRange = yearNearby(year, 4);

    return (
      <div 
        ref={(ref) => {this.node = ref}}
        className="dropdown month-picker"
        style={{display: 'inline-block'}}
      >
        {/* 下拉按钮部分 */} 
        {/* <p>选择月份</p> */}
        <button 
          className="btn btn-lg btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          onClick={this.toggleDropdown}  
        >
          {`${selectedYear}年 ${padMonth(selectedMonth)}月`}
        </button>

        {/* 下拉菜单部分 */}
        { isOpen && 
          <div 
            className="dropdown-menu"
            style={{ display: 'block', width: '250px' }}
          >
            <div className="row">
              {/* 下拉菜单-年份列 */}
              <div className="col border-right years-range">
                { 
                  yearRange.map(yearNum => (
                    <a 
                      key={yearNum}
                      href="#"
                      className={
                        activeToggleItem(
                          selectedYear,
                          yearNum, 
                        )
                      }
                      onClick={(e) => { this.selectYear(e, yearNum) }}
                    >
                      {yearNum} 年
                    </a>
                  )) 
                }
              </div>
              {/* 下拉菜单-月份列 */}
              <div className="col months-range">
                { 
                  monthRange.map(monthNum => (
                    <a 
                      key={monthNum}
                      href="#"
                      className={
                        activeToggleItem(
                          selectedMonth, 
                          monthNum,
                        )
                      }
                      onClick={(e) => { this.selectMonth(e, monthNum) }}
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
  onChange: PropTypes.func.isRequired,
};

MonthPicker.defaultProps = {
  year: (new Date()).getFullYear(),
  month: (new Date()).getMonth(),
}


export default MonthPicker;