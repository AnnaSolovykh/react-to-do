import React from "react";

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
                    <li style={{ lineHeight: "2" }} key={item.id}>
                        {item.title}
                    </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;