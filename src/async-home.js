const assignments =
  'div.upcoming-event.course-event span a';
const intervalTimer = 200;

document.styleSheets[0].insertRule(":root{--comp-color: #000000; --cal-border-color: #000000; --cal-text-color: #000000}");

setInterval(() => {
  updateColor();
}, 500);

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
  console.log(completeColor);

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
    span.style.color = 'var(--comp-color)';

    if (time !== null) {
      time.innerHTML = time.innerHTML + " | " + ele[1];
      time.style.color = 'var(--comp-color)';
    }

    element.parentNode.insertBefore(span, element.nextSibling);
  });
};
