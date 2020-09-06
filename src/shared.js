const urlPath = window.location.pathname;
const chromeStorage = chrome.storage.sync;

let schoologyData = [];

const getStorage = function (callback) {
  return new Promise((resolve, reject) => {
    chromeStorage.get('schoology-data', function ({
      'schoology-data': storedArr,
    }) {
      schoologyData = storedArr;

      if (typeof schoologyData === 'undefined') {
        chromeStorage.set({ 'schoology-data': [] }, () =>
          resolve(getStorage(callback))
        );
      } else {
        resolve(schoologyData);
        if (callback) callback();
      }
    });
  });
};
