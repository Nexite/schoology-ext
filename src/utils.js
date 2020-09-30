const sync = chrome.storage.sync;
const local = chrome.storage.local;

const assignments = 'schoology-check-assignments';
const completedColor = 'schoology-check-color';

const set = function (key, value, storage = sync) {
  storage.set({[key]: value}, () => {
    log(key + " set to:");
    console.log(value); // print object not object.toString()
  });
}

const get = async (key, storage = sync) => {
  return new Promise((resolve, reject) => {
    try {
      storage.get(key, function (result) {
        log("Get for " + key + " returned:");
        console.log(result[key]); // print object not object.toString()
        resolve(result[key]);
      })
    } catch (ex) {
      log("Getting " + key + " threw exception:")
      console.log(ex);
      reject(ex);
    }
  });
}

const log = function (msg) {
  console.log("[Schoology Check]: " + msg);
}

// https://gist.github.com/renancouto/4675192
// Negative percentages darken color
const lightenColor = function (color, percent) {
  let num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;

  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};

// https://awik.io/determine-color-bright-dark-using-javascript/
const isLight = function (color) {
  let r, g, b, hsp;

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

const updateColors = function (color) {
  if (typeof color === "undefined") color = "#04ae04";
  let root = document.documentElement;

  let isColorLight = isLight(color);

  let textColor = isColorLight ? '#000000' : '#ffffff'
  let borderColor = isColorLight ? lightenColor(color, -10) : lightenColor(color, 30);

  console.log(isColorLight + " " + borderColor);

  root.style.setProperty('--completed-color', color);
  root.style.setProperty('--completed-text-color', textColor);
  root.style.setProperty('--completed-border-color', borderColor);

  return isColorLight;
}