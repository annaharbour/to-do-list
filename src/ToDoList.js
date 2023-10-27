import React, { Component } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import axios from 'axios';

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
    
    componentDidMount() {
        this.fetchUserTasks();
    }

    componentWillUnmount() {
        this.setState({ isMounted: false }); 
    }


    fetchUserTasks(){
        axios.get('http://localhost:4000/tasks')
             .then(response => {
                this.setState({
                    todos: response.data
                });
             })
             .catch(error => {
                console.error('Error fetching tasks:', error);
             });
    }

    deleteToDo(id) {
        axios.delete(`http://localhost:4000/tasks/${id}`)
            .then(response => {
                if (response.status === 200) {
                    this.fetchUserTasks();
                    this.setState(prevState => ({
                        todos: prevState.todos.filter(todo => todo.id !== id)
                    }));
                }
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }  
    
    saveToDo(id, updatedTask){
    axios.put(`http://localhost:4000/tasks/${id}`, { task: updatedTask }) 
        .then(response => {
            this.fetchUserTasks()
            this.setState(prevState => ({
                todos: prevState.todos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                }),
            })
            
            );
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
        
    }

    completeToDo(id, completed) {
        axios.put(`http://localhost:4000/tasks/${id}`, { completed: !completed })
            .then(response => {
                this.fetchUserTasks(); 
            })
            .catch(error => {
                console.error('Error completing task:', error);
            });
    }
      
    createToDo(newToDo){
        axios.post('http://localhost:4000/tasks', newToDo) 
        .then(response => {
            this.setState(prevState => ({
                todos: [...prevState.todos, response.data],
            }));
        })
        .catch(error => {
            console.error('Error creating task:', error);
        });

    }
    render() {
        const todos = this.state.todos.map(todo => {
            return <li key={todo._id}>
                    <ToDo id={todo._id} 
                    saveToDo={this.saveToDo} 
                    deleteToDo={this.deleteToDo} 
                    completeToDo={() => this.completeToDo(todo._id, todo.completed)} 
                    completed={todo.completed} 
                    task={todo.task}/></li>
        })
        return (
            <div className='App'>
                <h1>To Do List</h1>
                <ToDoForm createToDo={this.createToDo}/>
                <ul className='todos'>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default ToDoList;