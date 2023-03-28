import React from 'react';

const AddTodoForm = (props) => {
    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(event)
        const todoTitle = event.target.elements.todoTitle.value;
        event.target.reset();
        console.log(todoTitle)
        props.onAddTodo(todoTitle);
    }

    return (
        <form onSubmit={handleAddTodo} style={{ display: "flex", flexDirection: "column",  alignItems: "center", justifyContent: "space-evenly", height: "100px" }}>
            <label htmlFor='todoTitle'>What are you going to do today?</label>
            <input id='todoTitle' name=''/>
            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;