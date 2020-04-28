let urlPath = window.location.pathname;
let assignmentId = Number(urlPath.split('/')[2]);

const submitBtn = document.querySelector(`a[href="/assignment/${assignmentId}/dropbox/submit"]`);

const getData = () => JSON.parse(localStorage.getItem('schoology-json'));

const clearData = () => writeData([]);

const writeData = obj => localStorage.setItem('schoology-json', JSON.stringify(obj));

const appendData = function(obj) {
  let newData = getData();
  newData.push(obj);
  localStorage.setItem('schoology-json', JSON.stringify(newData));
}

// Sets localstorage to [] if it is not an array OR it has a value of null
if (!Array.isArray(getData()) || getData() === null) clearData();

if(submitBtn.textContent !== 'Submit Assignment') {
  console.log('Assignment Submitted');

  jsonData = getData();

  if (!jsonData.some(obj => obj.id === assignmentId)) {
    console.log(`Assignment ID:${assignmentId} added to localstorage.`)

    appendData({ id: assignmentId });
  } else {
    console.log(`Assignment ID:${assignmentId} already in localstorage!`)
  }
  
} else {
  console.log('Assignment not submitted\nNo Action Taken')
}

