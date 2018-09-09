import dispatcher from '../stores/dispatcher';
import {
    CREATE_TODO,
    DELETE_TODO,
    TOGGLE_TODO
}
    from '../stores/actionTypes';

export function createTodo(text) {
    dispatcher.dispatch({
        type: CREATE_TODO,
        text
    });
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: DELETE_TODO,
        id
    })
}

export function toggleTodo(id) {
    dispatcher.dispatch({
        type: TOGGLE_TODO,
        id
    })
}