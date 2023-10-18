import React, { Component } from 'react';

class ToDo extends Component {    
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            updatedTask: this.props.task
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this)
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
                <div className='to-do'>
                    <input
                        type="text"
                        value={this.state.updatedTask}
                        onChange={this.handleTaskChange}
                    />
                    <button className='edit' onClick={this.handleSaveClick}>Save</button>
                </div>
            );
        }

        return (
            <div className='to-do'>
                <button className='edit' onClick={this.onEditClick}>Edit</button>
                <button className='delete' onClick={this.onDeleteClick}>X</button>
                <div className='task'>{this.props.task}</div>
            </div>
        );
    }
}

export default ToDo;