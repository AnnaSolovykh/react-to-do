import React from "react";
import PropTypes from  "prop-types";
import TodoListItem from "../ToDoListItem/ToDoListItem";
import style from "./TodoList.module.css";

const TodoList = ({ todoList, onRemoveItem, updateData }) => {

    return (
        <div className={style.container}>
            <ul className={style.list}>
                {todoList.map(item => {
                    return (
                        <TodoListItem 
                            key={item.id} 
                            todo={item} 
                            onRemoveItem={onRemoveItem}
                            updateData={updateData}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;


TodoList.propTypes = {
    todoList: PropTypes.array, 
    onRemoveItem: PropTypes.func,
    updateDate: PropTypes.func,
}