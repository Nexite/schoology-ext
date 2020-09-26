const assignments =
    'div.fc-event';
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
        return updateCalendar();
    }
    setTimeout(assignmentsInterval, intervalTimer);
};

const updateCalendar = function () {
    let completedElements = [];

    document.querySelectorAll(assignments).forEach((element) => {
        let assignmentName = element.querySelector(
            'span.infotip').innerHTML.split('<')[0];

        console.log(assignmentName);

        schoologyData.forEach((obj) => {
            if (obj.name === assignmentName) completedElements.push(element);
        });
    });

    console.log(completedElements);


    completedElements.forEach((element) => {
        element.style.background = "var(--comp-color)";
        element.style.borderColor = "var(--comp-border-color)";
        element.querySelector(
            'span.infotip').style.color = "var(--comp-text-color)";
    });

    console.log(schoologyData);

};

