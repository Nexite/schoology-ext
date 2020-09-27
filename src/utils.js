const chromeStorage = chrome.storage.sync;

const assignments = 'schoology-check-assignments';

const set = function (key, value) {
  chromeStorage.set({[key]: value}, () => {
    log(key + " set to:");
    console.log(value); // print object not object.toString()
  });
}

const get = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      chromeStorage.get(key, function (result) {
        log("Get for " + key + " returned:");
        console.log(result[key]); // print object not object.toString()
        resolve(result[key]);
      })
    } catch (ex) {
      log("Getting " + key + " threw exception:")
      console.log(ex);
      reject(ex);
    }
  });
}

const log = function (msg) {
  console.log("[Schoology Check]: " + msg);
}