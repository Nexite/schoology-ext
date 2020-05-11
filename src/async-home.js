const assignments = 'div.upcoming-event.course-event a'
const intervalTimer = 200;

// jQuery Document Ready
$(function() {
  console.log('jQuery Ready...');
  setTimeout(assignmentsInterval, intervalTimer);
});

const assignmentsInterval = function() {
  if ($(assignments).length > 0) return getStorage(writeChecks);
  setTimeout(assignmentsInterval, intervalTimer);
};

const writeChecks = function() {

  let completedID = [];

  $(assignments).each(function() {
    let relURL = this.pathname;

    let assignmentID = Number(relURL.split('/')[2]);

    if(!relURL.includes('assignment')) return;

    schoologyData.forEach(obj => { if(Number(obj.id) == assignmentID) completedID.push(assignmentID) });

  });

  completedID.forEach(id => {

    const element = document.querySelector(`a[href="/assignment/${id}"]`);

    let span = document.createElement('span');

    span.className += 'check';

    span.innerHTML = '✔';

    element.parentNode.insertBefore(span, element.nextSibling);

  })
  
}

