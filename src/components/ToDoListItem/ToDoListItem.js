import React from "react";
import { useState } from "react";
import PropTypes from  "prop-types";
import Swal from "sweetalert2";
import {ReactComponent as Edit} from "../../resources/edit.svg";
import {ReactComponent as Save} from "../../resources/save.svg";
import {ReactComponent as Delete} from "../../resources/delete.svg";
import style from "./TodoListItem.module.css";


const TodoListItem = ({todo, onRemoveItem, updateData, handleCheck}) => {
    const [editing, setEditing] = useState(true);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [checked, setChecked] = useState(false);

    const date =  new Date(todo.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric'  });

    const editItem = (event) => {
        const editedTitle = event.target.value;
        setNewTitle(editedTitle);
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (newTitle=== "" || newTitle === " ") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Type your goal please!",
            })
        } else {
            setEditing(true);
            updateData(newTitle, todo.id);
        }
    };

    return(
        <div className={style.container}>     
            {editing ? (
                <div className={style.conditionalContainer}>
                    <input 
                        type="checkbox"
                        onClick={()=> handleCheck(todo.id)}
                        className={style.checkbox}
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    /> 
                    <p className={todo.isChecked ? style.lineThrough : style.label}>
                        {newTitle}
                    </p>
                    <p className={style.label}>
                        {date}
                    </p> 
                    <button 
                        className={`${style.btn} ${style.editBtn}`}
                        onClick={()=> setEditing(false) }>
                            <Edit className={style.icon}/>
                    </button>
                    <button 
                        className={`${style.btn} ${style.doneBtn}`}
                        onClick={()=> onRemoveItem(todo.id) }>
                            <Delete className={style.icon}/>
                    </button>
                </div>
            ):(
                <form 
                    onSubmit={handleEditItem}
                    className={style.conditionalContainerForm}
                >
                    <input 
                        className={style.formInput} 
                        value={newTitle} 
                        onChange={editItem}>

                    </input> 
                    <button 
                        className={`${style.btn} ${style.saveBtn}`}
                        type="submit">
                            <Save className={style.formIcon}/> 
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