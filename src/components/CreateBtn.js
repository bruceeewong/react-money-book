import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

function CreateBtn({text, onClick}) {
  return (
    <button className="btn btn-primary btn-block 
      d-flex justify-content-center align-items-center">
      <Ionicon 
        icon="ios-add-circle"
        color="#fff"
        fontSize="30px"
      ></Ionicon>
      <span>{text}</span>
    </button>
  );
}

CreateBtn.propTypes = {
  text: PropTypes.string,
};

CreateBtn.defaultProps = {
  text: '创建一条新的记账记录',
};

export default CreateBtn;