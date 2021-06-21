class DatabaseUtils {
  init() {
    const dbRequest = indexedDB.open('dlp', 1);
    dbRequest.onupgradeneeded = () => {
      const upgradeDb = dbRequest.result;
      if (!upgradeDb.objectStoreNames.contains('regExStore')) {
        const regExStore = upgradeDb.createObjectStore('regExStore', { keyPath: 'id', autoIncrement: true });
        regExStore.createIndex('title', 'title', { unique: false });
        regExStore.createIndex('regEx', 'regEx', { unique: false });
        regExStore.createIndex('isEnabled', 'isEnabled', { unique: false });
      }
    };
    dbRequest.onerror = () => {
      console.error('Error connecting to indexedDB');
    };
    dbRequest.onsuccess = () => {
      console.log('Connected to indexedDB successfully');
    };
  }

  addRegexItem(regExItem) {
    return new Promise((resolve) => {
      const dbPromise = indexedDB.open('dlp', 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction('regExStore', 'readwrite');
        const regExStore = tx.objectStore('regExStore');
        regExStore.add(regExItem);
        resolve(tx.complete);
      };
    });
  }

  updateRegexItem(regExItem) {
    return new Promise((resolve) => {
      const dbPromise = indexedDB.open('dlp', 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction('regExStore', 'readwrite');
        const regExStore = tx.objectStore('regExStore');
        const dbRequest = regExStore.put(regExItem);
        dbRequest.onsuccess = () => {
          const data = dbRequest.result;
          resolve(data);
        };
      };
    });
  }

  deleteRegexItem(id) {
    return new Promise((resolve) => {
      const dbPromise = indexedDB.open('dlp', 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction('regExStore', 'readwrite');
        const regExStore = tx.objectStore('regExStore');
        const dbRequest = regExStore.delete(id);
        dbRequest.onsuccess = () => {
          const data = dbRequest.result;
          resolve(data);
        };
      };
    });
  }

  getRegexItem(id) {
    return new Promise((resolve) => {
      const dbPromise = indexedDB.open('dlp', 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction('regExStore', 'readonly');
        const regExStore = tx.objectStore('regExStore');
        const dbRequest = regExStore.get(id);
        dbRequest.onsuccess = () => {
          const data = dbRequest.result;
          resolve(data);
        };
      };
    });
  }

  getAllRegexItems() {
    return new Promise((resolve) => {
      const dbPromise = indexedDB.open('dlp', 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction('regExStore', 'readwrite');
        const regExStore = tx.objectStore('regExStore');
        const dbRequest = regExStore.getAll();
        dbRequest.onsuccess = () => {
          resolve(dbRequest.result);
        };
      };
    });
  }
}

export default DatabaseUtils;
