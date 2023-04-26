//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById('new-task');//Add a new task.
var addButton=document.querySelector('.add-item__button');//first button
var incompleteTaskHolder=document.getElementById('incomplete-tasks');//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById('completed-tasks');//completed-tasks


//New task list item
var createNewTaskElement=function(taskString) {

    var listItem=document.createElement('li');
    listItem.classList.add('todo__item');

    var checkBox=document.createElement('input');//input (checkbox)
    var label=document.createElement('label');//label
    var editInput=document.createElement('input');//input (text)
    var editButton=document.createElement('button');//edit button
    var deleteButton=document.createElement('button');//delete button
    var deleteButtonImg=document.createElement('img');//delete button image

    label.innerText=taskString;
    label.className='task';
    label.classList.add('task-title');

    //Each elements, needs appending
    checkBox.type='checkbox';
    checkBox.classList.add('todo-check');
    editInput.type='text';
    editInput.className='task task-edit';
    editButton.innerText='Edit'; //innerText encodes special characters, HTML does not.
    editButton.className='button-edit';
    deleteButton.className='button-del';
    deleteButtonImg.src='./remove.svg';

    //and appending.
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function() {
    console.log('Add Task...');
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value='';
}

//Edit an existing task.

var editTask=function() {
    console.log('Edit Task...');
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;
    var editInput=listItem.querySelector('.task-edit');
    var label=listItem.querySelector('.task-title');
    var editBtn=listItem.querySelector('.button-edit');
    var containsClass=listItem.classList.contains('todo-list__item_edit');
    //If class of the parent is .todo-list__item_edit
    if(containsClass) {
        //switch to .todo-list__item_edit
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText='Edit';
    }else{
        editInput.value=label.innerText;
        editBtn.innerText='Save';
    }
    //toggle .todo-list__item_edit on the parent.
    listItem.classList.toggle('todo-list__item_edit');
};


//Delete task.
var deleteTask=function() {
    console.log('Delete Task...');

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted=function() {
    console.log('Complete Task...');

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function() {
    console.log('Incomplete Task...');
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}


//Set the click handler to the addTask function.
addButton.addEventListener('click',addTask);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler) {
    console.log('bind list item events');
    //select ListItems children
    var checkBox=taskListItem.querySelector('.todo-check');
    var editButton=taskListItem.querySelector('.button-edit');
    var deleteButton=taskListItem.querySelector('.button-del');

    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.