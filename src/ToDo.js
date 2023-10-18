import React, { Component } from 'react';

class ToDo extends Component {    
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick(){
        this.props.deleteToDo(this.props.id);
    }
    render() {
        return (
            <div className='to-do'>
                <button className='edit'>Edit</button>
                <button className='delete' onClick={this.onDeleteClick}>X</button>
                <div className='task'>{this.props.task}</div>
            </div>
        );
    }
}

export default ToDo;