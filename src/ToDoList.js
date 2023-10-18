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

    completeToDo(id, completeToDo){
        this.setState({

        })
    }


    createToDo(newToDo){
        this.setState({
            todos: [...this.state.todos, newToDo]
        })
    }
    render() {
        const todos = this.state.todos.map(todo => {
            return <li key={todo.id}><ToDo id={todo.id} saveToDo={this.saveToDo} deleteToDo={this.deleteToDo} completeToDo={this.completeToDo} task={todo.task}/></li>
        })
        return (
            <div>
                <ul>
                    {todos}
                </ul>
                <ToDoForm createToDo={this.createToDo}/>
            </div>
        );
    }
}

export default ToDoList;