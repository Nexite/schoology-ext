const urlPath = window.location.pathname;
const assignmentId = Number(urlPath.split('/')[2]);
const chromeStorage = chrome.storage.local;

const submitBtn = document.querySelector(`a[href="/assignment/${assignmentId}/dropbox/submit"]`);

let schoologyData;

const getStorage = function() {
  chromeStorage.get('schoology-data', function(rawData) {
    schoologyData = rawData['schoology-data']

    if (typeof schoologyData === 'undefined') {
      chromeStorage.set({ 'schoology-data': [] }, getStorage)
    } else {
      writeStorage();
    }

  })

}

const writeStorage = function() {
  if (submitBtn.textContent === 'Submit Assignment') return console.log('Assignment not submitted\nNo action taken.');

  console.log('Assignment Submitted');

  if (schoologyData.some(obj => obj.id === assignmentId)) return console.log('Assignment already in Chrome Storage.')

  schoologyData.push({ id: assignmentId });

  chromeStorage.set({ 'schoology-data': schoologyData }, function() {

    console.log(`Assignment (${assignmentId}) added to localstorage.`)

    chromeStorage.get(function(result){console.log(result)})

  });

}

getStorage();

// chrome.storage.local.get(function(result){console.log(result)})