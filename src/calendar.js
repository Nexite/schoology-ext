let calendarAssignments;

$(document).ready(() => {
  // Wait for calendar objects to load
  setTimeout(() => {
    calendarAssignments = $('div.fc-event');
    get(assignments).then(updateCalendar);
  }, 500);
});
