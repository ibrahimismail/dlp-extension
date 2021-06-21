import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../Input';
import CloseIcon from './close.svg';
import './style.scss';

const RegExInput = (props) => {
  const { onAdd, onClose } = props;
  const [title, setTitle] = useState('');
  const [regEx, setRegEx] = useState('');

  const onAddRegEx = () => {
    const regExItem = {
      title,
      regEx,
      isEnabled: true,
    };
    onAdd(regExItem);
    setTitle('');
    setRegEx('');
  };

  const onTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const onRegExChange = ({ target: { value } }) => {
    setRegEx(value);
  };

  return (
    <div className="std-regex-input">
      <div className="header">
        <span>Enter DLP Item</span>
        <img src={CloseIcon} alt="close-icon" onClick={onClose} />
      </div>
      <div className="inputs">
        <Input placeholder="Title" value={title} onChange={onTitleChange} />
        <Input placeholder="Regular Expression" value={regEx} onChange={onRegExChange} />
      </div>
      <Button className="add-button" onClick={onAddRegEx}>
        Add
      </Button>
    </div>
  );
};

RegExInput.propTypes = {
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
};

export default RegExInput;
