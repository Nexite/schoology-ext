const assignments =
  'div.upcoming-event.course-event span a';
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
  console.log(schoologyData);

  let completedEle = [];

  $(assignments).each(function () {
    let relURL = this.pathname;

    if (!relURL.includes('assignment')) return;

    let assignmentID = Number(relURL.split('/')[2]);

    schoologyData.forEach((obj) => {
      if (Number(obj.id) === assignmentID) completedEle.push([assignmentID, obj.desc]);
    });
  });

  console.log(completedEle );

  completedEle.forEach((ele) => {
    const element = document.querySelector(
        `div a[href="/assignment/${ele[0]}"]`
    );

    const time = element.parentElement.querySelector(
        `span.upcoming-time`
    );

    let span = document.createElement('span');

    span.className += 'check';

    span.innerHTML = '✔';
    span.style.color = "rgb(35,177,5)";

    if (time !== null) {
      time.innerHTML = time.innerHTML + " | " + ele[1];
      time.style.color = "rgb(35,177,5)";
    }

    element.parentNode.insertBefore(span, element.nextSibling);
  });
};
