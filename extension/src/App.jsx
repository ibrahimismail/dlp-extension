import React, { useEffect, useState } from 'react';
import Switch from './components/Switch';
import Button from './components/Button';
import RegExItem from './components/RegExItem';
import './App.scss';
import BackgroundUtils from './utils/background';
import RegExInput from './components/RegExInput';

function App() {
  const [isEnabled, setEnabled] = useState(true);
  const [isAddRegExVisible, setAddRegExVisible] = useState(false);
  const [regExItems, setRegExItems] = useState([]);

  useEffect(() => {
    const bgUtils = new BackgroundUtils();
    bgUtils.getEnabledStatus().then((data) => {
      setEnabled(data.isEnabled);
    });
    bgUtils
      .getDatabaseInstance()
      .then((db) => {
        return db.getAllRegexItems();
      })
      .then((items) => {
        setRegExItems(items);
      });
  }, []);

  const onExtensionStatusChange = (status) => {
    setEnabled(status);
    const bgUtils = new BackgroundUtils();
    bgUtils.setEnabledStatus(status);
  };

  const openAddRegEx = () => {
    setAddRegExVisible(true);
  };
  const closeAddRegEx = () => {
    setAddRegExVisible(false);
  };

  const onRegExAdd = async (regExItem) => {
    const bgUtils = new BackgroundUtils();
    const db = await bgUtils.getDatabaseInstance();
    db.addRegexItem(regExItem)
      .then(() => {
        return db.getAllRegexItems();
      })
      .then((items) => {
        setRegExItems(items);
      });
  };

  console.log(isEnabled);
  return (
    <div className="App">
      <div className="header">
        <h1>DLP Extension</h1>
        <Switch isEnabled={isEnabled} onChange={onExtensionStatusChange} />
      </div>
      <div className="top-bar">
        <h2>Regular Expressions</h2>
        {!isAddRegExVisible && <Button onClick={openAddRegEx}>Add</Button>}
      </div>
      {isAddRegExVisible && <RegExInput onAdd={onRegExAdd} onClose={closeAddRegEx} />}
      <div className="items">
        {regExItems.map((item) => (
          <RegExItem key={item.id} isEnabled={item.isEnabled} title={item.title} regEx={item.regEx} />
        ))}
      </div>
    </div>
  );
}

export default App;
