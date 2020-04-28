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

const getStorage = function() {
  chromeStorage.get('schoology-data', function(rawData) {
    
    data = rawData['schoology-data'];
  
    if (typeof data === 'undefined') {
      console.log('Schoology data is undefined! Resetting...')
      resetStorage();
      getStorage();
    } else {
      uploadStorage();
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
      input.value = '';
    })
  });
}

uploadBtn.addEventListener('click', () => {
  clearText.innerHTML = '';
  if (input.value === '') {chrome.storage.local.get(function(result){console.log(result)}); return}
  getStorage();
})

// removeBtn.addEventListener('click', function() {
//   if (input.value === '') return;


// })


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