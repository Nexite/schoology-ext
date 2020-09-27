let assignmentElements;

$(document).ready(() => {
  assignmentElements = $('div.upcoming-event.course-event span a');
  get(assignments).then(updateAssignmentElements);
});

const updateAssignmentElements = function (completedAssignments) {

  let completedAssignmentElements = [];

  // Get completed assignment elements
  $.each(assignmentElements, (index, element) => {
    if (!element.pathname.includes("assignment")) return;

    let assignmentID = element.pathname.split('/')[2];
    $.each(completedAssignments, (index, obj) => {
      if (assignmentID === obj.id) completedAssignmentElements.push({
        element: element,
        description: obj.description
      });
    });
  });

  // Update each completed assignment
  $.each(completedAssignmentElements, (index, val) => {
    const element = val.element;

    const time = $($(element).parent().find('span.upcoming-time')[0]);
    const span = $(document.createElement('span'));


    span.addClass("check");

    span.html('✔');
    span.css('color', 'var(--completed-color)');

    // Make sure assignment has a due date
    if (typeof time !== "undefined") {
      time.html(time.html() + " | " + val.description);
      time.css('color', 'var(--completed-color)');
    }

    element.parentNode.insertBefore(span[0], element.nextSibling);
  });
}