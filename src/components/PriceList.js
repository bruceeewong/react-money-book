/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const PriceList = ({items, onModifyItem, onDeleteItem}) => {
  return (
    <ul className="list-group list-group-flush">
      {
        items.map(item => (
          <li 
            className="list-group-item d-flex justify-content-between align-items-center"
            key={item.id}  
          >
            {/* 图标 */}
            <span className="col-1 badge badge-primary">
              <Ionicon 
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#007bff', padding: '5px' }}
                color='#fff'
                icon={item.category.iconName}
              />
            </span>

            {/* 条目名称 */}
            <span className="col-5">{item.title}</span>

            {/* 条目金额 */}
            <span className="col-2 font-weight-bold">
              {(item.category.type === 'income') ? '+' : '-'}
              {item.price}元
            </span>

            {/* 条目时间 */}
            <span className="col-2">{item.date}</span>

            {/* 操作按钮 */}
            <a
              className="col-1"
              onClick={() => {onModifyItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#28a745', padding: '5px' }}
                color={'#fff'}
                icon="ios-create-outline"
              />
            </a>
            <a 
              className="col-1"
              onClick={() => {onDeleteItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#dc3545', padding: '5px' }}
                color={'#fff'}
                icon="ios-close"
              />
            </a>
          </li>
        ))
      }
    </ul>
  )
};

// 类型检查
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

// 默认props
PriceList.defaultProps = {
  onModifyItem: () => {},
  onDeleteItem: () => {},
};

export default PriceList;