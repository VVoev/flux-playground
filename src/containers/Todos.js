import React, { Component } from 'react';
import todoStore from '../stores/TodoStore';
import Todo from '../components/Todo';
import { createTodo, deleteTodo, toggleTodo } from '../actions/todoActions';


class Todos extends Component {

    constructor() {
        super();
        this.state = {
            todos: todoStore.getAll(),
            newTodo: ''
        }
    }

    componentWillMount() {
        todoStore.on('change', () => {
            this.setState({
                todos: todoStore.getAll(),
                newTodo: ''
            })
        })
    }

    handleAdd = () => {
        createTodo(this.state.newTodo);
    }

    handleDelete = (e) => {
        const key = +e.currentTarget.getAttribute('data');
        deleteTodo(key);
    }

    handleCompleted = (e) => {
        const key = +e.currentTarget.getAttribute('data');
        toggleTodo(key);
    }

    render() {
        const { todos } = this.state;
        const todoComponents = todos.map((todo) => {
            return <Todo key={todo.id} {...todo} clicked={(e) => this.handleDelete(e)} completed={(e) => this.handleCompleted(e)} />
        })


        return (
            <div>
                <h1>Todos</h1>
                <ul>
                    {todoComponents}
                </ul>
                <h3>Create new todo:</h3>
                <input value={this.state.newTodo} onChange={(e) => this.setState({ newTodo: e.target.value })} />
                <button onClick={this.handleAdd}>Submit</button>
            </div>
        );
    }
}

export default Todos;