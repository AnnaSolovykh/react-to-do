import React from "react";
import TodoListItem from "./ToDoListItem";


const TodoList = ({ todoList, onRemoveItem}) => {
    
    return (
        <div>
            <ul>
                {todoList.map(item => {
                    //console.log(item)
                    return (
                        <TodoListItem 
                            key={item.id} 
                            todo={item} 
                            onRemoveItem={onRemoveItem}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;