import { Task } from '../classes';
import { todoList } from '../index';

// HTML Refs
const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const btnDeleteChecked  = document.querySelector('.clear-completed');
const ulFilters         = document.querySelector('.filters');
const anchorFilters     = document.querySelectorAll('.filtro');
const todoCount         = document.querySelector('.todo-count');


// HTML Task
export const newTaskHtml = ( todo ) => {
    
    const div = document.createElement('div');
    
    const htmlTodo = `
    <li class="${(todo.isComplete) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.isComplete) ? 'checked' : ''}>
            <label>${ todo.duty }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    updatePendingTaskHtml();

    return div.firstElementChild;
}

// Updates todo-count class and adds current pending from todo list.
const updatePendingTaskHtml = () => {
    todoCount.innerHTML = '';
    const htmlPending = `<strong>${todoList.pending.length}</strong> pendiente(s)</span>`;
    todoCount.innerHTML = htmlPending;
}


// Event Listeners
/// On key up if 'enter' -> take txtInput value, create a new task and add the task to the todo list.
txtInput.addEventListener('keyup', ( event ) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        const newDuty = new Task( txtInput.value );
        todoList.newTodo(newDuty);

        newTaskHtml( newDuty );
        txtInput.value = '';
    }
});

/// On click hover div with class todo-list, check if the clicked element has 'input' update the Task object selected by id and toggle completed class otherwise
/// if includes button delete the current element fron the list and destroy the child of div.
divTodoList.addEventListener('click', ( event ) => {
    const clickedElement    = event.target.localName;
    const todoElement       = event.target.parentElement.parentElement;
    const todoID            = todoElement.getAttribute('data-id');

    if (clickedElement.includes('input')) {

        todoList.checkTodo( todoID );
        todoElement.classList.toggle('completed');
        updatePendingTaskHtml();

    } else if ( clickedElement.includes('button')){

        todoList.deleteTodo( todoID );
        divTodoList.removeChild( todoElement );
        updatePendingTaskHtml();

    }

});

//// TODO: Evento para abrir modal y editar la tarea, subir notas (con imagenes), modificar descripcion, establecer tiempos limite, otrascosas.
// divTodoList.addEventListener('ondblclick', ( event ) => {
//     const clickedElement    = event.target.localName;
//     const todoElement       = event.target.parentElement.parentElement;
//     const todoID            = todoElement.getAttribute('data-id');
// });



/// On button delete all checked is clicked, execute todolist method for checked and remove all checked html elements.
btnDeleteChecked.addEventListener('click', () =>{
    
    todoList.deleteAllChecked();

    for (let i = divTodoList.children.length - 1; i >= 0; i--){
        const htmlElement = divTodoList.children[i];

        if ( htmlElement.classList.contains('completed') ){
            divTodoList.removeChild( htmlElement );
        }
    }

    updatePendingTaskHtml();

});


ulFilters.addEventListener('click', (event) => {
    const filter = event.target.id;
    if (!filter) {return;}

    console.log(event.target);

    anchorFilters.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const element of divTodoList.children){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        //// Cambiar este filtrado y agregarles ID a los botones: Todos, Pendientes y Completados.
        switch ( filter ){
            case 'show-onwait':
                if( completed ){
                    element.classList.add('hidden');
                }
                break;

            case 'show-completed':
                    if( !completed ){
                        element.classList.add('hidden');
                    }
                break;
        }
    }

});
