import React from "react";
import { useState } from "react";
import PropTypes from  "prop-types";
import {ReactComponent as Edit} from "../../resources/edit.svg";
import {ReactComponent as Delete} from "../../resources/delete.svg";
import ItemEditForm from "./ItemEditForm";
import style from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveItem, updateData, handleCheck }) => {
    const [newTitle, setNewTitle] = useState(todo.title);
    const [editing, setEditing] = useState(true);
    const [checked, setChecked] = useState(todo.isChecked);
    
    const date =  new Date(todo.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' });

    const handleCheckInput = () => {
        setChecked(!checked);
        handleCheck(checked, todo.id);
    };

    return(
        <div className={style.container}>     
            {editing ? (
                <div className={style.conditionalContainer}>
                    <input 
                        type="checkbox"
                        className={style.checkbox}
                        onChange={handleCheckInput}
                        checked={todo.isChecked}
                    /> 
                    <p className={checked ? style.lineThrough : style.label}>
                        {newTitle}
                    </p>
                    <p className={style.label}>
                        {date}
                    </p> 
                    <button 
                        className={`${style.btn} ${style.editBtn}`}
                        onClick={()=> setEditing(false)}>
                            <Edit className={style.icon}/>
                    </button>
                    <button 
                        className={`${style.btn} ${style.doneBtn}`}
                        onClick={()=> onRemoveItem(todo.id)}>
                            <Delete className={style.icon}/>
                    </button>
                </div>
            ):(
                <ItemEditForm 
                    todo={todo} 
                    newTitle={newTitle} 
                    setNewTitle={setNewTitle} 
                    updateData={updateData} 
                    setEditing={setEditing}
                />
            )}  
        </div>
    );
};

export default TodoListItem;

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveItem: PropTypes.func,
    updateDate: PropTypes.func,
    handleCheck: PropTypes.func,
}