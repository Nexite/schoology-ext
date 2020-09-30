let assignmentElements;

$(document).ready(() => {
  assignmentElements = $('div.upcoming-event.course-event span a');
  get(assignments).then(updateAssignmentElements);
});

const updateAssignmentElements = function (completedAssignments) {
  updateAssignmentsFromArray(completedAssignments, assignmentElements);
}
