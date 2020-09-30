let assignmentElements;

$(document).ready(() => {
  assignmentElements = $('div.upcoming-event.course-event h4 a');
  get(assignments).then(updateAssignmentElements);
});

const updateAssignmentElements = function (completedAssignments) {
  updateAssignmentsFromArray(completedAssignments, assignmentElements);
}
