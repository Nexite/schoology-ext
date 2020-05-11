const assignmentId = Number(urlPath.split('/')[2]);
const submitBtn = `a[href="/assignment/${assignmentId}/dropbox/submit"].link-btn`;

// jQuery Document Ready
$(function() {

  if ($(submitBtn)[0] === undefined) return console.log('One or more variables is undefined... Report to developer.');

  getStorage(writeStorage);

  setTimeout(checkBtn, 500);
  
});

const checkBtn = function() {

  if ($(submitBtn).text() !== 'Submit Assignment' && $(submitBtn).text() !== 'Edit Draft') {
    
    getStorage(writeStorage);

    return console.log('Assignment submitted! Clearing interval and executing getStorage()');

  }

  console.log('Assignment not submitted...');
  
  setTimeout(checkBtn, 500);

}

const writeStorage = function() {
  if ($(submitBtn).text() === 'Submit Assignment' || $(submitBtn).text() === 'Edit Draft') return console.log('Assignment not submitted\nNo action taken.');

  if (schoologyData.some(obj => obj.id === assignmentId)) return console.log('Assignment already in Chrome Storage.')

  schoologyData.push({ id: assignmentId });

  chromeStorage.set({ 'schoology-data': schoologyData }, function() {

    console.log(`Assignment (${assignmentId}) added to localstorage.`)

    chromeStorage.get(function(result){console.log(result)})

  });

}

// chrome.storage.local.get(function(result){console.log(result)})