let assignmentElements;
let canlenderOpened = false;

$(document).ready(() => {
  assignmentElements = $('div.upcoming-event.course-event h4 a');
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
