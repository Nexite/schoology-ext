const assignments =
  'div.upcoming-events div.upcoming-event.course-event span a';
const intervalTimer = 200;

// jQuery Document Ready
$(function () {
  console.log('jQuery Ready...');
  setTimeout(assignmentsInterval, intervalTimer);
});

const assignmentsInterval = async () => {
  if ($(assignments).length > 0) {
    await getStorage();
    return writeChecks();
  }
  setTimeout(assignmentsInterval, intervalTimer);
};

const writeChecks = function () {
  let completedID = [];

  $(assignments).each(function () {
    let relURL = this.pathname;

    if (!relURL.includes('assignment')) return;

    let assignmentID = Number(relURL.split('/')[2]);

    schoologyData.forEach((obj) => {
      if (Number(obj.id) == assignmentID) completedID.push(assignmentID);
    });
  });

  console.log(completedID);

  completedID.forEach((id) => {
    const element = document.querySelector(
      `div.upcoming-events a[href="/assignment/${id}"]`
    );

    let span = document.createElement('span');

    span.className += 'check';

    span.innerHTML = '✔';

    element.parentNode.insertBefore(span, element.nextSibling);
  });
};
