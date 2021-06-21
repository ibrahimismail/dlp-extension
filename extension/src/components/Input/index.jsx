import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Input = (props) => {
  const { placeholder, value, onChange } = props;
  return <input className="std-input" placeholder={placeholder} value={value} onChange={onChange} />;
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
