import React from "react";

const TodoListItem = (prop) => {
    return(
            <li style={{ lineHeight: "2" }}>
                {prop.todo.title}
            </li>
    );
};

export default TodoListItem;