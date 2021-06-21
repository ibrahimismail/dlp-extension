import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import './style.scss';

function RegExItem(props) {
  const { title, isEnabled, regEx } = props;
  return (
    <div className="std-regex-item">
      <div className="regex-header">
        <p className="title">{title}</p>
        <div className={classNames({ status: true, enabled: isEnabled })}></div>
      </div>
      <div className="regex">{regEx}</div>
    </div>
  );
}

RegExItem.propTypes = {
  title: PropTypes.string,
  isEnabled: PropTypes.bool,
  regEx: PropTypes.string,
};

export default RegExItem;
