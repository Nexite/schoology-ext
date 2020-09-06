const assignmentId = Number(urlPath.split('/')[2]);
const submitBtn = `a[href="/assignment/${assignmentId}/dropbox/submit"].link-btn`;
const grade = '.grading-grade';
const receivedGrade = '.grading-grade span.received-grade';

// jQuery Document Ready
$(function () {
  if ($(submitBtn)[0] === undefined)
    return console.error(
      'One or more variables is undefined... Report to developer.'
    );

  setTimeout(checkCompleted, 500);
});

const checkCompleted = async () => {
  await getStorage();
  if (
    $(submitBtn).text() !== 'Submit Assignment' &&
    $(submitBtn).text() !== 'Edit Draft'
  ) {
    console.log('Assignment submitted! Clearing interval.');
    return writeStorage();
  }

  if ($(receivedGrade)[0]) {
    console.log('Assignment has recieved Grade... Clearing interval');
    return writeStorage();
  }

  console.log('Assignment not submitted...');

  setTimeout(checkCompleted, 500);
};

const writeStorage = function () {
  if (schoologyData.some((obj) => obj.id === assignmentId))
    return console.log('Assignment already in Chrome Storage.');

  schoologyData.push({ id: assignmentId });

  chromeStorage.set({ 'schoology-data': schoologyData }, function () {
    console.log(`Assignment (${assignmentId}) added to localstorage.`);

    chromeStorage.get(function (result) {
      console.log(result);
    });
  });
};
