class BackgroundUtils {
  getEnabledStatus() {
    return new Promise((resolve) => {
      chrome.runtime.getBackgroundPage((bgWindow) => {
        bgWindow.getEnabledStatus().then((data) => {
          resolve(data);
        });
      });
    });
  }

  setEnabledStatus(status) {
    chrome.runtime.getBackgroundPage((bgWindow) => {
      bgWindow.setEnabledStatus(status);
    });
  }

  getDatabaseInstance() {
    return new Promise((resolve) => {
      chrome.runtime.getBackgroundPage((bgWindow) => {
        const dbInstance = bgWindow.getDbInstance();
        resolve(dbInstance);
      });
    });
  }
}

export default BackgroundUtils;
