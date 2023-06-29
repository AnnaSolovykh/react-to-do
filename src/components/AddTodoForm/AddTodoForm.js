import React, { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from  "prop-types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import style from "./AddTodoForm.module.css";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle=== "" || todoTitle === " ") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Type your goal please!",
            })
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
                placeholder="A new goal to achieve..."
            >
                <p>Meet your goals to fulfill your dreams!</p>
            </InputWithLabel>   
            <button className={style.button} type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
}