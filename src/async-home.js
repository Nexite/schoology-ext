let assignments;

// jQuery Document Ready
$(function() {
  assignments = document.querySelectorAll("div.upcoming-event.course-event a");
  getStorage(writeChecks);
});

const logAssignments = function() {
  assignments.forEach(assignment => console.log(Number(assignment.pathname.split('/')[2])));
}

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

    span.innerHTML = '✔'

    element.parentNode.insertBefore(span, element.nextSibling);

  })

  
  // console.log(schoologyData)
  // console.log(completedID);
  // logAssignments();
  
}

