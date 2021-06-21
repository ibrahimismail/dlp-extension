import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import './style.scss';

function Switch(props) {
  const { isEnabled, onChange } = props;
  return (
    <div
      className="std-switch"
      onClick={() => {
        onChange(!isEnabled);
      }}>
      <div className={classNames({ slider: true, disabled: !isEnabled })} />
      <div className={classNames({ button: true, clicked: isEnabled })} />
    </div>
  );
}

Switch.propTypes = {
  isEnabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Switch;
