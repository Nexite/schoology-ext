// TODO: Clean up

const input = $('#id-input')[0];
const addBtn = $('#add')[0];
const clearBtn = document.getElementById('clear');
const colorBtn = document.getElementById('color');
const removeBtn = document.getElementById('remove');
const clearText = document.querySelector('.clearText');
const info = document.getElementById('info');

const addInfo = function (str, append) {
    input.value = '';
    if (append) return (info.innerHTML += str + '<br>');
    info.innerHTML = str + '<br>';
};

const resetStorage = function () {
    chromeStorage.set({'schoology-data': []}, function () {
        chromeStorage.get('schoology-data', function (result) {
            console.log(result);
        });
    });

    completeColor = '#23B105';
    saveColor();
};

const uploadStorage = function () {
    let duplicateValue = false;

    schoologyData.forEach((obj) => {
        if (Number(obj.id) === Number(input.value)) duplicateValue = true;
    });

    if (duplicateValue) return addInfo('No Duplicate Values!', false);

    schoologyData.push({id: Number(input.value), desc: "Manually Added"});

    chromeStorage.set({'schoology-data': schoologyData}, function () {
        chromeStorage.get('schoology-data', function (result) {
            console.log(result);
            addInfo(`ID Added (${input.value})`, true);
        });
    });
};

addBtn.addEventListener('click', () => {
    clearBtn.innerHTML = 'Clear Assignments';
    clearCount = 0;
    if (input.value === '') {
        chromeStorage.get(function (result) {
            console.log(result);
        });
        return;
    }
    getStorage(uploadStorage);
});

removeBtn.addEventListener('click', function () {
    clearBtn.innerHTML = 'Clear Assignments';
    clearCount = 0;

    if (input.value === '') return;

    getStorage(function () {
        const newData = schoologyData.filter(
            (obj) => Number(obj.id) !== Number(input.value)
        );

        if (schoologyData.length === newData.length)
            return addInfo(`ID Already Removed!`, false);

        chromeStorage.set({'schoology-data': newData}, () => {
            chromeStorage.get(function (result) {
                console.log(result);
            });
            addInfo(`Removed ID (${input.value})`, true);
        });
    });
});

let clearCount = 0;

clearBtn.addEventListener('click', function () {
    resetStorage();
    clearBtn.innerHTML =
        clearCount === 0 ? 'Cleared!' : `Cleared ${clearCount + 1} times!`;
    clearCount++;
});

input.addEventListener('click', () => {
    clearText.innerHTML = '';
    clearCount = 0;
});

colorBtn.addEventListener('click', function () {
    $("#colorpicker").click();
});

// Make sure border-box works (border-box requires defined height)
$(colorBtn).css("height", $(clearBtn).outerHeight() + 'px');

// TODO: Update color picker after you click in it rather than after you click off of it
$("#colorpicker").on("change", (e) => {
    updateColorButton(e.target.value);

    completeColor = e.target.value;
    saveColor();

    console.log(completeColor);
});

function updateColorButton(color) {
    colorBtn.style.background = color;

    let light = isLight(color);
    colorBtn.style.color = (light) ? 'black' : 'white';
    colorBtn.style.border = (light) ? '2px solid black' : '2px solid ' + color;
}

function saveColor() {
    chromeStorage.set({'schoology-data-color': completeColor}, function () {
        chromeStorage.get('schoology-data-color', function (result) {
            console.log("save color " + result);
        });
    });
}

// TODO: Make popup window load with correct color button
window.onload = function () {
    console.log("trying");
    getStorage().then(() => {
        chromeStorage.get('schoology-data-color',
            function ({
                          'schoology-data-color': storedColor
                      }) {
                completeColor = storedColor;
            });
        $("#colorpicker").value = completeColor;
        updateColorButton(completeColor);
    })
}