const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');


let updatedOnLoad = false;


let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];


function getSavedColumns() {
    if (localStorage.getItem('backlogItems')) {
      backlogListArray = JSON.parse(localStorage.backlogItems);
      progressListArray = JSON.parse(localStorage.progressItems);
      completeListArray = JSON.parse(localStorage.completeItems);
      onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
      backlogListArray = ['Release the course', 'Sit back and relax'];
      progressListArray = ['Work on projects', 'Listen to music'];
      completeListArray = ['Being cool', 'Getting stuff done'];
      onHoldListArray = ['Being uncool'];
    }
  }



  function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((value,index) => {
        localStorage.setItem(`${value}Items`, JSON.stringify(listArrays[index]));
    })
  }


  function createItem(listColumn, columnInd, item, index) {

        const listItem = document.createElement('li');
        listItem.classList.add("drag-item");
        listItem.textContent = item;
        listColumn.appendChild(listItem);

        return listItem;

  }


  // Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {

    
    // Check localStorage once
    if (!updatedOnLoad) {
        getSavedColumns();
    }
    

    // Backlog Column
    backlogListEl.textContent = '';
    backlogListArray.forEach((item,index) => {
        
        createItem(backlogListEl, 0, item, index);

    })

   
    // Progress Column

    progressListEl.textContent = '';
    progressListArray.forEach((item,index) => {
        
        createItem(progressListEl, 1, item, index);

    })

    
    // Complete Column

    completeListEl.textContent = '';
    completeListArray.forEach((item,index) => {
        
        createItem(completeListEl, 2, item, index);

    })

    // On Hold Column

    onHoldListEl.textContent = '';
    onHoldListArray.forEach((item,index) => {
        
        createItem(onHoldListEl, 3, item, index);

    })

    // Don't run more than once, Update Local Storage

  }

  updateDOM();
  