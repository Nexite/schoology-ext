const urlPath = window.location.pathname;
const chromeStorage = chrome.storage.sync;

let schoologyData = [];

const getStorage = function (callback) {
  chromeStorage.get('schoology-data', function ({
    'schoology-data': storedArr,
  }) {
    schoologyData = storedArr;

    if (typeof schoologyData === 'undefined') {
      chromeStorage.set({ 'schoology-data': [] }, () => getStorage(callback));
    } else {
      callback();
    }
  });
};
