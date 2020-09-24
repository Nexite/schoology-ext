const assignmentId = Number(urlPath.split('/')[2]);
const assignmentName = document.querySelector("h2.page-title").innerHTML;

const submitBtn = `a[href="/assignment/${assignmentId}/dropbox/submit"].link-btn`;
const grade = '.grading-grade';
const receivedGrade = '.grading-grade span.received-grade';

let cancelInterval = false;
let newBtn;

// jQuery Document Ready
$(function () {

    setTimeout(checkCompleted, 500);
    $(submitBtn).parent().after('<div id="schoology-ext-md" style="margin-top: 10px;"></div>');
    newBtn = $("#schoology-ext-md");
});

const checkCompleted = async () => {
    await getStorage();

    let newBtn = $("#schoology-ext-md");

    function getDesc() {
        let toReturn = "error";
        $.each(schoologyData, function(i, v) {
            if (v.id === assignmentId) {
                toReturn = v.desc;
                return false;
            }
        });
        return toReturn;
    }

    if (schoologyData.some((obj) => obj.id === assignmentId)) {
        newBtn.html('<a href="#" id="schoology-ext-anc" style="padding: 3px 36px; border: 1px solid black; color: black; text-decoration: none; background-color: #a7ffa7;">' + getDesc() + '</a>');
        newBtn.click(function () {
            removeFromStorage(assignmentId);
        });
    } else {
        newBtn.html('<a href="#" id="schoology-ext-anc" style="padding: 3px 36px; border: 1px solid black; color: black; text-decoration: none; background-color: #ffa6a6;">Mark as Done</a>');
        newBtn.click(function () {
            writeStorage("Marked as Done");
        });
    }

    $("#schoology-ext-anc").click((e) => {
       e.preventDefault();
    });

    if (!cancelInterval) {

        if ($(receivedGrade)[0]) {
            console.log('Assignment has received Grade');
            writeStorage("Graded");
        }

        if ($(submitBtn).text() !== 'Submit Assignment' &&
            $(submitBtn).text() !== 'Edit Draft') {
            console.log('Assignment submitted!');
            writeStorage("Completed");
        }
    }

    setTimeout(checkCompleted, 500);
};

const writeStorage = function (description) {
    cancelInterval = true;

    if (schoologyData.some((obj) => obj.id === assignmentId))
        return console.log('Assignment already in Chrome Storage.');

    schoologyData.push({
        id: assignmentId,
        name: assignmentName,
        desc: description
    });

    console.log(schoologyData);

    chromeStorage.set({'schoology-data': schoologyData}, function () {
        console.log(`Assignment (${assignmentId}) added to localstorage.`);

        chromeStorage.get(function (result) {
            console.log(result);
        });
    });
};

const removeFromStorage = function (id) {
    if (!schoologyData.some((obj) => obj.id === assignmentId))
        return;

    schoologyData = schoologyData.filter((obj) => obj.id !== assignmentId);

    console.log(schoologyData);

    chromeStorage.set({'schoology-data': schoologyData}, function () {
        console.log(`Assignment (${assignmentId}) removed from localstorage.`);

        chromeStorage.get(function (result) {
            console.log(result);
        });
    });
};
