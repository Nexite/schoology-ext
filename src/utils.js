const chromeStorage = chrome.storage.sync;

const assignments = 'schoology-check-assignments';

const set = function (key, value) {
  chromeStorage.set({ [key]: value }, () => {
    log(key + ' set to:');
    console.log(value); // print object not object.toString()
  });
};

const get = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      chromeStorage.get(key, function (result) {
        log('Get for ' + key + ' returned:');
        console.log(result[key]); // print object not object.toString()
        resolve(result[key]);
      });
    } catch (ex) {
      log('Getting ' + key + ' threw exception:');
      console.log(ex);
      reject(ex);
    }
  });
};

const log = function (msg) {
  console.log('[Schoology Check]: ' + msg);
};

const updateAssignmentsFromArray = function (completedAssignments, assignmentElements) {
  let completedAssignmentElements = [];

  // Get completed assignment elements
  $.each(assignmentElements, (index, element) => {
    if (!element.pathname.includes('assignment')) return;

    let assignmentID = element.pathname.split('/')[2];
    $.each(completedAssignments, (index, obj) => {
      if (assignmentID === obj.id)
        completedAssignmentElements.push({
          element: element,
          description: obj.description,
        });
    });
  });

  // Update each completed assignment
  $.each(completedAssignmentElements, (index, val) => {
    const element = val.element;

    const time = $($(element).parent().find('span.upcoming-time')[0]);
    const span = $(document.createElement('span'));

    span.addClass('check');

    span.html('✔');
    span.css('color', 'var(--completed-color)');

    // Make sure assignment has a due date
    if (typeof time !== 'undefined') {
      time.html(time.html() + ' | ' + val.description);
      time.css('color', 'var(--completed-color)');
    }

    element.parentNode.insertBefore(span[0], element.nextSibling);
  });
};
