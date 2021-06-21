let regExItems = [];
let initialized = false;
let extensionEnabled = true;
let abortController;

const port = chrome.runtime.connect({ name: 'contentScriptChannel' });
port.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.event) {
    case 'regExAll_response':
      regExItems = msg.data;
      if (!initialized) {
        initListeners();
        initialized = true;
      }
      break;
    default:
      break;
  }
});
port.postMessage({ event: 'regExAll_request' });

chrome.runtime.onMessage.addListener((msg) => {
  switch (msg.event) {
    case 'extensionStatusChanged':
      console.log({ msg });
      extensionEnabled = msg.data;
      if (!extensionEnabled) {
        removeListeners();
      } else {
        initListeners();
      }
      break;
    default:
      break;
  }
});

const initListeners = () => {
  console.log('initializing');
  abortController = new AbortController();
  const { signal } = abortController;
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    checkDlpRegEx(input);
    input.addEventListener('input', checkDlpRegEx(input), { signal });
  }
};

const removeListeners = () => {
  abortController.abort();
};

const checkDlpRegEx = (input) => () => {
  const matches = [];
  for (let i = 0; i < regExItems.length; i++) {
    const regExItem = regExItems[i];
    const regEx = new RegExp(regExItem.regEx);
    const match = regEx.test(input.value) && regExItem.isEnabled;
    if (match) {
      matches.push(regExItem.id);
    }
  }
  if (matches.length) {
    const iframeSrc = chrome.runtime.getURL('iframe.html');
    const iframe = document.createElement('iframe');
    const inputOffset = input.getBoundingClientRect();
    const iframeOffset = iframe.getBoundingClientRect();
    const newTop = inputOffset.top + inputOffset.height;
    const newLeft = inputOffset.left - iframeOffset.width;
    Object.assign(iframe.style, {
      position: 'fixed',
      top: newTop + 'px',
      left: newLeft + 'px',
      zIndex: 999999,
      width: '300px',
      border: 0,
    });
    const { iFrameElement } = input;
    if (iFrameElement) {
      iFrameElement.src = iframeSrc + `?id=${matches.join('-')}`;
    } else {
      iframe.src = iframeSrc + `?id=${matches.join('-')}`;
      input.iFrameElement = iframe;
      document.body.appendChild(iframe);
    }
  } else {
    if (input.iFrameElement) {
      const { iFrameElement } = input;
      document.body.removeChild(iFrameElement);
      delete input.iFrameElement;
    }
  }
};
