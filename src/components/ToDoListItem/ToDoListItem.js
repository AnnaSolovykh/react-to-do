import React from "react";
import { useState } from "react";
import PropTypes from  "prop-types";
import style from "./TodoListItem.module.css";


const TodoListItem = ({todo, onRemoveItem, updateData}) => {
    const [editing, setEditing] = useState(true)
    const [newTitle, setNewTitle] = useState(todo.title)

    const editItem = (event) => {
        const editedTitle = event.target.value;
        setNewTitle(editedTitle)
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (newTitle=== "" || newTitle === " ") {
            alert("Write something!")
        } else {
            setEditing(true);
            updateData(newTitle, todo.id);
        }
    };

    const date =  new Date(todo.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric'  });

    return(
        <div className={style.container}>       
            {editing ? (
                <div className={style.conditionalContainer}>
                    <p className={style.label}>
                        {newTitle}
                    </p>
                    <p className={style.label}>
                        {date}
                    </p> 
                    <button 
                        className={`${style.btn} ${style.editBtn}`}
                        onClick={()=> setEditing(false) }>
                    </button>
                    <button 
                        className={`${style.btn} ${style.doneBtn}`}
                        onClick={()=> onRemoveItem(todo.id) }>
                    </button>
                </div>
            ):(
                <form 
                    onSubmit={handleEditItem}
                    className={`${style.conditionalContainer} ${style.editForm}`}
                >
                    <input 
                        className={style.formInput} 
                        value={newTitle} 
                        onChange={editItem}>

                    </input>
                    <button 
                        className={`${style.btn} ${style.saveBtn}`}
                        type="submit">
                    </button>
                </form>

            )}
            
        </div>
    );
};

export default TodoListItem;

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveItem: PropTypes.func,
    updateDate: PropTypes.func,
}