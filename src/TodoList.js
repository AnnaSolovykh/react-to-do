import React from "react";
import TodoListItem from "./ToDoListItem";


const TodoList = ({ todoList, onRemoveItem, updateData }) => {
    return (
        <div>
            <ul>
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