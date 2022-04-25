import { Task, TodoList } from './classes'
import { newTaskHtml } from './js/components';
import './styles.css';

export const todoList = new TodoList();
todoList.todos.forEach( task => newTaskHtml(task));

// const duty = new Task('Test JS');
// todoList.newTodo(duty);

console.log(todoList.completed);
console.log(todoList);