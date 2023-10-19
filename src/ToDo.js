import React, { Component } from 'react';

class ToDo extends Component {    
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            updatedTask: this.props.task,
            completed: false
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.completeToDo = this.completeToDo.bind(this);
    }

    completeToDo(){
        this.props.completeToDo(this.props.id);
    }

    onDeleteClick(){
        this.props.deleteToDo(this.props.id);
    }

    onEditClick(){
        this.setState({
            isEditing: true
        })
    }
    handleTaskChange = (event) => {
        this.setState({ updatedTask: event.target.value });
    }

    handleSaveClick = () => {
        this.props.saveToDo(this.props.id, this.state.updatedTask);
        this.setState({ isEditing: false });
    }

    render() {
        if (this.state.isEditing) {
            return (
                <div className='todo'>
                    <input
                        type="text"
                        value={this.state.updatedTask}
                        onChange={this.handleTaskChange}
                    />
                    <button className='save' onClick={this.handleSaveClick}><i className="fas fa-save"></i></button>
                </div>
            );
        }

        return (
            <div className={`todo ${this.props.completed ? 'completed' : ''}`}>
                <div className='action-buttons'>
                    <button className='edit' onClick={this.onEditClick}><i className="fa-solid fa-pencil"></i></button>
                    <button className='delete' onClick={this.onDeleteClick}><i className="fa-solid fa-trash"></i></button>
                    <button className='complete' onClick={this.completeToDo}><i className="fa-solid fa-check"></i></button>
                </div>
                <div className='task'>{this.props.task}</div>
            </div>
        );
    }
}

export default ToDo;