import DatabaseUtils from './utils/database.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isEnabled: true }, () => {
    console.log('extension initialized');
  });
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }
  const dbUtils = new DatabaseUtils();
  dbUtils.init();
});

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case 'contentScriptChannel':
      port.onMessage.addListener(async function (msg, sender, sendMessage) {
        const dbUtils = new DatabaseUtils();
        switch (msg.event) {
          case 'regExAll_request':
            dbUtils.getAllRegexItems().then((items) => {
              port.postMessage({
                event: 'regExAll_response',
                data: items,
              });
            });
            break;
          case 'regExMatches_request':
            const items = [];
            const ids = msg.data;
            for (let i = 0; i < ids.length; i++) {
              const regExItem = dbUtils.getRegexItem(parseInt(ids[i], 10));
              items.push(regExItem);
            }
            const result = await Promise.all(items);
            const titles = result.map((item) => item.title);
            port.postMessage({
              event: 'regExMatches_response',
              data: titles,
            });
            break;
          default:
            break;
        }
      });
      break;
    default:
      break;
  }
});

window.getDbInstance = () => {
  const dbUtils = new DatabaseUtils();
  return dbUtils;
};

window.getEnabledStatus = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('isEnabled', (data) => {
      resolve(data);
    });
  });
};

window.setEnabledStatus = (status) => {
  return new Promise(() => {
    chrome.storage.sync.set({ isEnabled: status }, (data) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { event: 'extensionStatusChanged', data: status });
      });
    });
  });
};
