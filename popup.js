const input = document.getElementById('id-input')
const uploadBtn = document.getElementById('upload')
const clearBtn = document.getElementById('clear');
const removeBtn = document.getElementById('remove');
const clearText = document.querySelector('.clearText');
const info = document.getElementById('info')
const chromeStorage = chrome.storage.local;

let clearCount = 0;
let data;

const addInfo = function(str, append) {
  input.value = '';
  if (append) return info.innerHTML += str + '<br>';
  info.innerHTML = str + '<br>';
}

const resetStorage = function() {
  chromeStorage.set({ "schoology-data": [] }, function() {
    chromeStorage.get('schoology-data', function(result){
      console.log(result)
    })
  });
}

const getStorage = function(callback = uploadStorage) {
  chromeStorage.get('schoology-data', function(rawData) {
    
    data = rawData['schoology-data'];
  
    if (typeof data === 'undefined') {
      console.log('Schoology data is undefined! Resetting...')
      resetStorage();
      getStorage();
    } else {
      callback();
    }
  })
}

const uploadStorage = function() {
  let duplicateValue = false;
  
  data.forEach(obj => { if(Number(obj.id) === Number(input.value)) duplicateValue = true } )

  if(duplicateValue) return addInfo('No Duplicate Values!', false);

  data.push({ id: Number(input.value) });

  chromeStorage.set({ "schoology-data": data }, function() {;
    chromeStorage.get('schoology-data', function(result){
      console.log(result);
      addInfo(`ID Uploaded (${input.value})`, true)
    })
  });
}

uploadBtn.addEventListener('click', () => {
  clearText.innerHTML = '';
  if (input.value === '') {chromeStorage.get(function(result){console.log(result)}); return}
  getStorage();
})

const removedIDs = [];

removeBtn.addEventListener('click', function() {
  if (input.value === '') return;


  getStorage(function() {
    
    if (removedIDs.includes(Number(input.value))) return addInfo(`ID Already Removed!`, false);
    
    const newData = data.filter(obj => Number(obj.id) !== Number(input.value))
    
    chromeStorage.set({ "schoology-data": newData }, () => {
      removedIDs.push(Number(input.value));
      chromeStorage.get(function(result){console.log(result)})
      addInfo(`Removed ID (${input.value})`, true);
    })

  });

})

clearBtn.addEventListener('click', function() {
  resetStorage();
  addInfo('', false);
  clearText.innerHTML = clearCount === 0 ? 'Cleared!' : `Cleared ${clearCount + 1} times!`
  clearCount++
})

input.addEventListener('click', () => {
  clearText.innerHTML = '';
  clearCount = 0;
})