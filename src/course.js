let assignmentElements;

$(document).ready(() => {
  assignmentElements = $('div.upcoming-event.course-event h4 a');
  if (window.location.href.indexOf("materials?") >= 0) {
    assignmentElements = $('div.item-title a');
  }
  get(assignments).then(updateAssignmentElements);
});

$( "#event-calendar" ).click(function() {
  setTimeout(() => {
    calendarAssignments = $('div.fc-event');
    get(assignments).then(updateCalendar);
  }, 500);
});

const updateAssignmentElements = function (completedAssignments) {
  updateAssignmentsFromArray(completedAssignments, assignmentElements);
}
