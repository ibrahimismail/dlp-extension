import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import './style.scss';

function Button(props) {
  const { children, onClick, className } = props;
  return (
    <button className={classNames({ 'std-button': true, [className]: true })} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
