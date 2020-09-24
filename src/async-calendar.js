const assignments =
    'div.fc-event';
const intervalTimer = 200;

// jQuery Document Ready
$(function () {
    console.log('jQuery Ready...');
    setTimeout(assignmentsInterval, intervalTimer);
});

const assignmentsInterval = async () => {
    if ($(assignments).length > 0) {
        await getStorage();
        return updateCalendar();
    }
    setTimeout(assignmentsInterval, intervalTimer);
};

const updateCalendar = function () {
    let completedElements = [];

    document.querySelectorAll(assignments).forEach((element) => {
        let assignmentName = element.querySelector(
            'span.infotip'
        ).innerHTML.split('<')[0];

        console.log(assignmentName);

        schoologyData.forEach((obj) => {
            if (obj.name === assignmentName) completedElements.push(element);
        });
    });

    console.log(completedElements);

    completedElements.forEach((element) => {
        element.style.background = 'lime';
        element.style.borderColor = 'green';
    });

    console.log(schoologyData);

};
