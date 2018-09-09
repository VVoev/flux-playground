import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import * as actionTypes from './actionTypes';
import axios from 'axios';
class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [
            {
                id: 1122334455,
                text: 'Lets finish the task',
                complete: false
            },
            {
                id: 1234567890,
                text: 'Awe we going to aqua park',
                complete: false
            }
        ]
    }

    getAll() {
        return this.todos;
    }

    async createTodo(text) {
        const id = Date.now();
        const restData = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        const { data } = restData;
        const title = data.title;
        this.todos.push({
            id,
            text,
            complete: false
        })



        this.emit('change');
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id !== id
        })
        this.emit('change');
    }

    toggleTodo(id) {
        this.todos.find((todo) => {
            if (todo.id === id) {
                return todo.complete = !todo.complete
            }
        })
        this.emit('change');
    }

    handleActions(action) {
        switch (action.type) {
            case actionTypes.CREATE_TODO: {
                this.createTodo(action.text)
                break;
            }
            case actionTypes.DELETE_TODO: {
                this.deleteTodo(action.id)
                break;
            }
            case actionTypes.TOGGLE_TODO: {
                this.toggleTodo(action.id)
                break;
            }
            default:
                return;
        }

    }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;