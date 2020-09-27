let calendarAssignments;

$(document).ready(() => {
  // Wait for calendar objects to load
  setTimeout(() => {
    calendarAssignments = $('div.fc-event');
    get(assignments).then(updateCalendar);
  }, 500);
});

const updateCalendar = function (completedAssignments) {
  let completedCalendarAssignments = [];

  // Get completed assignments
  $.each(calendarAssignments, (index, element) => {
    let assignmentName = $(element).find('span.infotip').html().split('<')[0];


    $.each(completedAssignments, (index, obj) => {
      if (assignmentName === obj.name) {
        completedCalendarAssignments.push($(element));
      }
    });
  });

  // Update each completed assignment
  $.each(completedCalendarAssignments, (index, element) => {
    element.css('background-color', "var(--completed-color)");
    element.css('border-color', "var(--completed-border-color)");
    element.find('span.infotip').css('color', "var(--completed-text-color)");
  });
}