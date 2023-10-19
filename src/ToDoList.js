import React, { Component } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state= {
            todos : []
        };
        this.createToDo = this.createToDo.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.completeToDo = this.completeToDo.bind(this);
        this.saveToDo = this.saveToDo.bind(this);
    }

    deleteToDo(id){
        this.setState({
            todos: this.state.todos.filter(todo=>todo.id !== id)
        })
    }
    
    saveToDo(id, updatedTask){
        const updatedToDos = this.state.todos.map(todo => {
            if (todo.id === id){
                return {...todo, task: updatedTask};
            }
            return todo;
        });
        this.setState({
           todos: updatedToDos 
        });
        
    }

    completeToDo(id) {
        const updatedToDos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.setState({
           todos: updatedToDos 
        });
    }
    

    createToDo(newToDo){
        this.setState({
            todos: [...this.state.todos, newToDo]
        })
    }
    render() {
        const todos = this.state.todos.map(todo => {
            return <li key={todo.id}><ToDo id={todo.id} saveToDo={this.saveToDo} deleteToDo={this.deleteToDo} completeToDo={this.completeToDo} completed={todo.completed} task={todo.task}/></li>
        })
        return (
            <div>
                <ToDoForm createToDo={this.createToDo}/>
                <ul className='todos'>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default ToDoList;