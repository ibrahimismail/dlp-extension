const port = chrome.runtime.connect({ name: 'contentScriptChannel' });
let regExMatches = [];
port.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.event) {
    case 'regExMatches_response':
      regExMatches = msg.data;
      renderMatches();
      break;
    default:
      break;
  }
});

const params = new URLSearchParams(window.location.search);
const ids = params.get('id').split('-');
port.postMessage({ event: 'regExMatches_request', data: ids });

const renderMatches = () => {
  matchesDiv = document.getElementById('regExMatches');
  for (let i = 0; i < regExMatches.length; i++) {
    const regExMatchTitle = regExMatches[i];
    const p = document.createElement('p');
    p.className = 'card-regex-title';
    const textNode = document.createTextNode(regExMatchTitle);
    p.appendChild(textNode);
    matchesDiv.appendChild(p);
  }
};
