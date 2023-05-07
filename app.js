// ------------
// Selectors
// ------------
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

const selectAllButton = document.querySelector('.select-all');
const selectCompletedButton = document.querySelector('.select-completed');
const selectUncompletedButton = document.querySelector('.select-uncompleted');

// -----------------
// Event Listeners
// -----------------
todoButton.addEventListener('click', addNewTodo);
todoList.addEventListener('click', deleteOrCheck);

selectAllButton.addEventListener('click', setFilter);
selectCompletedButton.addEventListener('click', setFilter);
selectUncompletedButton.addEventListener('click', setFilter);

// -----------
// Functions
// -----------

function addNewTodo(event) {
    // addnewTodo() to add new todo to the list

    // Prevent browser submitting the form
    event.preventDefault();

    // INFO: Each todo-item will contain 3 objects inside a div container:
    //       a todo-content span tag with content
    //       a todo-completed button
    //       a todo-delete button

    // Creating div container with todo:
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    // Creating a span with todo-content:
    const todoContent = document.createElement('span');
    todoContent.classList.add('todo-content');
    todoContent.innerText = todoInput.value;

    // Creating a todo-completed button
    const todoCompleted = document.createElement('button');
    todoCompleted.classList.add('todo-completed');
    todoCompleted.innerHTML = '<i class="fas fa-check"></i>';

    // Creating a todo-delete button
    const todoDelete = document.createElement('button');
    todoDelete.classList.add('todo-delete');
    todoDelete.innerHTML = '<i class="fas fa-trash"></i>';

    // Mounting the new todo using appendChild() into the todo-item div:
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(todoCompleted);
    todoDiv.appendChild(todoDelete);

    // Finally, attaching it to the list of todos:
    todoList.appendChild(todoDiv);

    // Cleaning up the todoInput:
    todoInput.value = '';
    
};

function deleteOrCheck(event) {
    // This function add functionality for the todo items buttons (check or delete)
    const item = event.target;

    // Checking what the user is clicking and then implementing the function:
    if (item.classList[0] === 'todo-delete') {
        // Adding an animation to delete the todo:
        item.parentElement.remove();
        //item.parentElement.remove();
    }
    if (item.classList[0] === 'todo-completed') {
        item.parentElement.classList.toggle('completed');
        
        if (selectUncompletedButton.classList.contains('select-active')) {
            item.parentElement.classList.toggle('todo-hide');
        }

        if (selectCompletedButton.classList.contains('select-active') && 
            !item.parentElement.classList.contains('todo-hide')) {
            item.parentElement.classList.toggle('todo-hide');
        }
    }
}

function setFilter(event) {
    // This function implements the logic to display todos according to the filter selected.
    // Is uses CSS classes attached to each todo to define if displays or not.


    // Uncheck all buttons and then toggle only the pressed one if pressing a non-active one
    if (!event.target.classList.contains('select-active')) {
        selectAllButton.classList.remove('select-active');
        selectCompletedButton.classList.remove('select-active');
        selectUncompletedButton.classList.remove('select-active');
        event.target.classList.toggle('select-active');

        // Logic for select-all
        if (event.target.classList.contains('select-all')) {
            // Resetting status
            for (let i = 1; i < todoList.childNodes.length; i++) {
                todoList.childNodes[i].classList.remove('todo-hide');
            }
        }

        // Logic for select-completed
        if (event.target.classList.contains('select-completed')) {
            // Resetting status
            for (let i = 1; i < todoList.childNodes.length; i++) {
                todoList.childNodes[i].classList.remove('todo-hide');
            }
            // Iterating over childNodes should be done with for.
            for (let i = 1; i < todoList.childNodes.length; i++) {
                if (!todoList.childNodes[i].classList.contains('completed')) {
                    todoList.childNodes[i].classList.toggle('todo-hide');
                }
            }
        }

        // Logic for select-uncompleted
        if (event.target.classList.contains('select-uncompleted')) {
            // Resetting status
            for (let i = 1; i < todoList.childNodes.length; i++) {
                todoList.childNodes[i].classList.remove('todo-hide');
            }
            // Iterating over childNodes to add .auto-hide:
            for (let i = 1; i < todoList.childNodes.length; i++) {
                if (todoList.childNodes[i].classList.contains('completed')) {
                    todoList.childNodes[i].classList.toggle('todo-hide');
                }
            }
        }
    }
}