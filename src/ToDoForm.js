import React, { Component } from 'react';
import uuid from "react-uuid";
import axios from 'axios';

class ToDoForm extends Component {
    constructor(props){
        super(props);
        this.state={
            task: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const newToDo = {...this.state, id: uuid()}
        this.props.createToDo(newToDo);
        this.setState({
            task: ''
        })

    }
    render() {
        return (
            <div>
                <form className="todo-form" onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} value={this.state.task} name="task" type='text'></input>
                    <button type="submit" value="submit"><i className="fa-solid fa-plus"></i></button>
                </form>
            </div>
        );
    }
}

export default ToDoForm;