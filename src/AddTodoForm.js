import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("");

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
        setTodoTitle("")
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
            
            <InputWithLabel 
                id="todoTitle"
                value={todoTitle} 
                onInputChange={handleTitleChange}
            >
                <strong>Title:</strong>
            </InputWithLabel>   

            <button type="submit">Add</button>

        </form>
    );
}

export default AddTodoForm;