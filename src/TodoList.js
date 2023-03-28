import React from "react";
import TodoListItem from "./ToDoListItem";

const todoList = [
    {
        id: 1,
        title: "Learn React",
    },
    
    {
        id: 2,
        title: "Do some exercises",
    },

    {
        id: 3,
        title: "Cook food",
    },
    ];

const TodoList = () => {
    return (
        <div>
            <ul>
                {todoList.map((item) => {
                    return (
                        <TodoListItem key={item.id} todo={item}/>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;