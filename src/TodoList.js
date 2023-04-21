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
                            key={item.newTodo.id} 
                            todo={item.newTodo} 
                            onRemoveItem={onRemoveItem}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;