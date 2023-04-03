import React from "react";

const TodoListItem = ({todo}) => {
    return(
            <li style={{ lineHeight: "2" }}>
                {todo.title}
            </li>
    );
};

export default TodoListItem;