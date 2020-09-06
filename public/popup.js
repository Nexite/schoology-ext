const input = $('#id-input')[0];
const uploadBtn = $('#upload')[0];
const clearBtn = document.getElementById('clear');
const removeBtn = document.getElementById('remove');
const clearText = document.querySelector('.clearText');
const info = document.getElementById('info');

const addInfo = function (str, append) {
  input.value = '';
  if (append) return (info.innerHTML += str + '<br>');
  info.innerHTML = str + '<br>';
};

const resetStorage = function () {
  chromeStorage.set({ 'schoology-data': [] }, function () {
    chromeStorage.get('schoology-data', function (result) {
      console.log(result);
    });
  });
};

const uploadStorage = function () {
  let duplicateValue = false;

  schoologyData.forEach((obj) => {
    if (Number(obj.id) === Number(input.value)) duplicateValue = true;
  });

  if (duplicateValue) return addInfo('No Duplicate Values!', false);

  schoologyData.push({ id: Number(input.value) });

  chromeStorage.set({ 'schoology-data': schoologyData }, function () {
    chromeStorage.get('schoology-data', function (result) {
      console.log(result);
      addInfo(`ID Uploaded (${input.value})`, true);
    });
  });
};

uploadBtn.addEventListener('click', () => {
  clearText.innerHTML = '';
  clearCount = 0;
  if (input.value === '') {
    chromeStorage.get(function (result) {
      console.log(result);
    });
    return;
  }
  getStorage(uploadStorage);
});

// const removedIDs = [];

removeBtn.addEventListener('click', function () {
  if (input.value === '') return;

  getStorage(function () {
    const newData = schoologyData.filter(
      (obj) => Number(obj.id) !== Number(input.value)
    );

    if (schoologyData.length === newData.length)
      return addInfo(`ID Already Removed!`, false);

    chromeStorage.set({ 'schoology-data': newData }, () => {
      // removedIDs.push(Number(input.value));
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
  clearText.innerHTML =
    clearCount === 0 ? 'Cleared!' : `Cleared ${clearCount + 1} times!`;
  clearCount++;
});

input.addEventListener('click', () => {
  clearText.innerHTML = '';
  clearCount = 0;
});
