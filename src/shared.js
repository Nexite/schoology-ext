const urlPath = window.location.pathname;
const chromeStorage = chrome.storage.sync

let schoologyData = [];
let completeColor = "#000000";

const getStorage = function (callback) {
    return new Promise((resolve) => {
        chromeStorage.get('schoology-data',
            function ({
                          'schoology-data': storedArr,
                      }) {

                chromeStorage.get('schoology-data-color',
                    function ({
                                  'schoology-data-color': storedColor
                              }) {
                        completeColor = storedColor;
                        if (typeof completeColor === 'undefined') {
                            completeColor = '#23B105';
                            updateColor();
                        }
                    });

                schoologyData = storedArr;

                if (typeof schoologyData === 'undefined') {
                    chromeStorage.set({'schoology-data': []}, () =>
                        resolve(getStorage(callback))
                    );
                } else {
                    resolve([schoologyData]);
                    if (callback) callback();
                }
            });
    });
};

const updateColor = function () {
    return new Promise((resolve) => {
            chromeStorage.get('schoology-data-color',
                function ({
                              'schoology-data-color': storedColor
                          }) {
                    completeColor = storedColor;
                });

        document.querySelector(":root")
            .style.setProperty('--comp-color', completeColor);
        document.querySelector(":root")
            .style.setProperty('--comp-border-color', lightenDarkenColor(completeColor, 0.1));
        document.querySelector(":root")
            .style.setProperty('--comp-text-color', isLight(completeColor) ? 'black' : 'white');

        resolve(completeColor)
    });
}

// Shamelessly stolen from https://css-tricks.com/snippets/javascript/lighten-darken-color/
// TODO: Find a working version of this function
function lightenDarkenColor(col, amt) {
    if (col instanceof String && col.startsWith("#")) col = col.slice(1);

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return "#" + (g | (b << 8) | (r << 16)).toString(16);
}


// Shamelessly stolen from https://awik.io/determine-color-bright-dark-using-javascript/
function isLight(color) {
    let r, g, b, hsp;

    console.log(color);

    color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;

    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    return hsp > 127.5;
}