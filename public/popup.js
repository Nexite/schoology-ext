let input;
let btnAdd;
let btnClear;
let btnRemove;
let clearText;
let info;

$(document).ready()
{
  input = $('#id-input')[0];
  btnAdd = $('#upload')[0];
  btnClear = document.getElementById('clear');
  btnRemove = document.getElementById('remove');
  clearText = document.querySelector('.clearText');
  info = document.getElementById('info');
}

const addInfo = function (str, append) {
  input.value = '';
  if (append) return (info.innerHTML += str + '<br>');
  info.innerHTML = str + '<br>';
};

const resetStorage = function () {
  set(assignments, []);
};

const uploadStorage = async () => {
  let assignmentArray = await get(assignments);

  let duplicateValue = false;

  $.each(assignmentArray, (obj) => {
    if (Number(obj.id) === Number(input.value)) duplicateValue = true;
  });

  if (duplicateValue) return addInfo('No Duplicate Values!', false);

  assignmentArray.push({
    id: Number(input.value),
    name: "",
    description: "Manually Added"
  });

  set(assignments, assignmentArray);
};

btnAdd.addEventListener('click', async () => {
  clearText.innerHTML = '';
  clearCount = 0;

  if (input.value === '') return;
  await uploadStorage();
});

btnRemove.addEventListener('click', async () => {
  if (input.value === '') return;

  let assignmentArray = await get(assignments);

  const newData = assignmentArray.filter(
    (obj) => Number(obj.id) !== Number(input.value)
  );

  if (assignmentArray.length === newData.length)
    return addInfo(`ID Already Removed!`, false);

  set(assignments, assignmentArray);
  addInfo(`Removed ID (${input.value})`, true);
});

let clearCount = 0;

btnClear.addEventListener('click', function () {
  resetStorage();
  clearText.innerHTML =
    clearCount === 0 ? 'Cleared!' : `Cleared ${clearCount + 1} times!`;
  clearCount++;
});

input.addEventListener('click', () => {
  clearText.innerHTML = '';
  clearCount = 0;
});