import React, { useState } from "react";
import PropTypes from  "prop-types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import style from "./AddTodoForm.module.css"

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle=== "" || todoTitle === " ") {
            alert("Write something!")
        } else {
            onAddTodo(todoTitle);
            setTodoTitle("");
        }
    };

    return (
        <form 
            onSubmit={handleAddTodo}
            className={style.addToDoForm}>

            <InputWithLabel 
                id="todoTitle"
                value={todoTitle} 
                onInputChange={handleTitleChange}
                placeholder="Be kind to yourself..."
            >
                <strong>A new task to deal with:</strong>
            </InputWithLabel>   

            <button className={style.button} type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
}