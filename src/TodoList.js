import React from "react";
import TodoListItem from "./ToDoListItem";


const TodoList = ({todoList}) => {
    return (
        <div>
            <ul>
                {todoList.map((item) => {
                    return (
                        <TodoListItem key={item.newTodo.id} todo={item.newTodo}/>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;