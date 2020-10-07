import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const Loader = (props) => (
  <div className="loading-component text-center">
    <Ionicon
      icon={props.icon}
      fontSize={props.fontSize}
      color={props.color}
      rotate={props.rotate}
    />
    <p>{props.text}</p>
  </div>
);

Loader.defaultProps = {
  icon: 'ios-refresh',
  fontSize: '40px',
  color: '#347eff',
  rotate: true,
  text: '加载中',
};

Loader.propTypes = {
  icon: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  rotate: PropTypes.bool,
  text: PropTypes.string,
};

export default Loader;
