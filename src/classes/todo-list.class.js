import { Task } from './task.class';

export class TodoList {
    todos = [];

    constructor(){

        this.loadFromLocalStorage();

    }

    newTodo( todo ){
        this.todos.push( todo );
        this.saveToLocalStorage();
    }

    editTodo( id, value ){
        const found = this.todos.find(elem => elem == id );
        this.todos[found].duty = value;
    }

    deleteTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.saveToLocalStorage();
    }

    checkTodo( id ){
        for( const curr of this.todos ){
            if ( curr.id == id ){
                curr.isComplete = !curr.isComplete;
                this.saveToLocalStorage();
                break;
            }
        }
    }

    get completed(){
        return this.todos.filter( todo => todo.isComplete );
    }

    get pending(){
        return this.todos.filter( todo => !todo.isComplete );
    }

    deleteAllChecked(){
        if ( this.todos.length >= 0 ){
            this.todos = this.todos.filter( todo => !todo.isComplete );
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    loadFromLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
        ? JSON.parse(localStorage.getItem('todo')) 
        : [];

        this.todos = this.todos.map( obj => Task.fromJSON(obj));


    }
}