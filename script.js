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
let dragging = false;


let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

//Drag Functionality variables
let draggedItem;
let columnToDropTo;


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
        listItem.draggable = true;
        listItem.setAttribute('ondragstart', 'drag(event)');

        listItem.contentEditable = true;
        listItem.id = index;
        listItem.setAttribute('onfocusout', `updateItem(${index}, ${columnInd})`);
        listColumn.appendChild(listItem);

        

  }

  function filterArray(array) {
    return array.filter(item => item !== null);
    
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

      backlogListArray = filterArray(backlogListArray);

    
      // Progress Column

      progressListEl.textContent = '';
      progressListArray.forEach((item,index) => {
          
          createItem(progressListEl, 1, item, index);

      })

      progressListArray = filterArray(progressListArray);

      
      // Complete Column

      completeListEl.textContent = '';
      completeListArray.forEach((item,index) => {
          
          createItem(completeListEl, 2, item, index);

      })

      completeListArray = filterArray(completeListArray);

      // On Hold Column

      onHoldListEl.textContent = '';
      onHoldListArray.forEach((item,index) => {
          
          createItem(onHoldListEl, 3, item, index);

      })

      onHoldListArray = filterArray(onHoldListArray);

      // Don't run more than once, Update Local Storage

      updatedOnLoad = true;
      updateSavedColumns();


  }

  //Updatre an item/ or delete if necessary
  function updateItem(id, colInd) {

    const selectedArray = listArrays[colInd];
    const selectedColElement = listColumns[colInd].children[id];

    if (!dragging) {

      if(!selectedColElement.textContent) {

        delete selectedArray[id];
        
  
      } else {
  
        selectedArray[id] = selectedColElement.textContent;
  
      }
      
      updateDOM();

    }
  }




  function drag(e) {

    draggedItem = e.target;
    dragging = true;
    

  }

  //Allowing item to be dropped in other columns
  function allowDrop(e) {
    e.preventDefault();
  }

  //Dropping item into the column
  function drop(e) {
    e.preventDefault();
    //our functionality
    listColumns[columnToDropTo].appendChild(draggedItem);


    listColumns.forEach(list => {

      list.classList.remove("over");

    })

    dragging = false;
    
    rebuildArrays();

  }


  function rebuildArrays() {

    backlogListArray = [];

    for (let i = 0; i < backlogListEl.children.length; i++) {
      backlogListArray.push(backlogListEl.children[i].textContent);
    }

    progressListArray = [];

    for (let i = 0; i < progressListEl.children.length; i++) {
      progressListArray.push(progressListEl.children[i].textContent);
    }

    completeListArray = [];

    for (let i = 0; i < completeListEl.children.length; i++) {
      completeListArray.push(completeListEl.children[i].textContent);
    }

    onHoldListArray = [];

    for (let i = 0; i < onHoldListEl.children.length; i++) {
      onHoldListArray.push(onHoldListEl.children[i].textContent);
    }

    updateDOM();

  }


  //Item enters a column
  function enterCol(columnInd) {
    listColumns[columnInd].classList.add("over");
    columnToDropTo = columnInd;
    

  }


  //Diplay input field on add button click

  function showInputBox(colInd) {

    addBtns[colInd].style.display = 'none';
    saveItemBtns[colInd].style.display = 'flex';
    addItemContainers[colInd].style.display = 'flex';



  }

  function  addTocolumn(colInd) {

    const itemText = addItems[colInd].textContent;
    const selectedArray = listArrays[colInd];
    selectedArray.push(itemText);
    updateDOM();
    addItems[colInd].textContent = '';


  }

  //Hide input field on save button click

    function hideInputBox(colInd) {

      addBtns[colInd].style.display = 'flex';
      saveItemBtns[colInd].style.display = 'none';
      addItemContainers[colInd].style.display = 'none';

      const item = addItemContainers[colInd].textContent;

      addTocolumn(colInd);
    
    }



  updateDOM();
  