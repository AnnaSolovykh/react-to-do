import React, { useState } from 'react';

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(
            {
                title: todoTitle, 
                id: Date.now(),
            }
        );
        setTodoTitle('')
    }

    return (
        <form 
        onSubmit={handleAddTodo} 
        style={{ 
            display: "flex", 
            flexDirection: "column",  
            alignItems: "center", 
            justifyContent: "space-evenly", 
            height: "100px" }}>
            <label htmlFor='todoTitle'>What are you going to do today?</label>
            <input id='todoTitle' value={todoTitle} onChange={handleTitleChange} />
            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;