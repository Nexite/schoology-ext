const urlPath = window.location.pathname;
const assignmentId = Number(urlPath.split('/')[2]);
const chromeStorage = chrome.storage.local;

const submitBtn = document.querySelector(`a[href="/assignment/${assignmentId}/dropbox/submit"]`);

let schoologyData;

// jQuery Document Ready
$(function() {

  assignments = document.querySelectorAll("div.upcoming-event.course-event a");

  getStorage();

  const btnInterval = setInterval(function() {
    if (submitBtn.textContent !== 'Submit Assignment') {

      clearInterval(btnInterval);

      getStorage();

      return console.log('Assignment submitted! Clearing interval and executing getStorage()');

    }
    
    console.log('Assignment not submitted...');

  }, 500)

  // $("body").on('DOMSubtreeModified', 'a.add.dropbox-submit', function() {

  //   console.log('TEXT CHANGED!!!!')
  //   getStorage();

  // });

  // $(`a[href="/assignment/${assignmentId}/dropbox/submit"]`).on('click', function() {

  //   $("body").on('DOMSubtreeModified', 'div.submit-buttons', function() {

  //     $('div.submit-buttons')

  //     $("div.submit-buttons input#edit-submit.form-submit");

  //     if ($("div.submit-buttons input#edit-submit.form-submit")[0] === undefined) return console.log('bruh');

  //     console.log($("div.submit-buttons input#edit-submit.form-submit")[0]);
  //     $("body").unbind();

  //   });

  // });

});



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

  // console.log('Assignment Submitted');

  if (schoologyData.some(obj => obj.id === assignmentId)) return console.log('Assignment already in Chrome Storage.')

  schoologyData.push({ id: assignmentId });

  chromeStorage.set({ 'schoology-data': schoologyData }, function() {

    console.log(`Assignment (${assignmentId}) added to localstorage.`)

    chromeStorage.get(function(result){console.log(result)})

  });

}

// chrome.storage.local.get(function(result){console.log(result)})