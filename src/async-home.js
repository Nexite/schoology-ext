let assignments;

// jQuery Document Ready
$(function() {
  assignments = $("div.upcoming-event.course-event a").toArray()
  console.log('Document Ready...')
  console.log(assignments)
  getStorage(writeChecks);
});

// const logAssignments = function() {
//   assignments.forEach(assignment => console.log(Number(assignment.pathname.split('/')[2])));
// }

const writeChecks = function() {

  let completedID = [];
  
  assignments.forEach(assignment => {
    let relURL = assignment.pathname;

    let assignmentID = Number(relURL.split('/')[2]);

    if(!relURL.includes('assignment')) return;

    schoologyData.forEach(obj => { if(Number(obj.id) == assignmentID) completedID.push(assignmentID) });
  })

  completedID.forEach(id => {

    const element = document.querySelector(`a[href="/assignment/${id}"]`);

    let span = document.createElement('span');

    span.className += 'check';

    span.innerHTML = '✔'

    element.parentNode.insertBefore(span, element.nextSibling);

  })
  
}

