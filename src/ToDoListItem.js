import React from "react";

const TodoListItem = ({todo, onRemoveItem}) => {
    //console.log(todo.id)
    return(
        <>
            <li style={{ lineHeight: "2" }}>
                {todo.title}
            </li>
            <button onClick={ ()=> onRemoveItem(todo.id) }>Remove</button>
        </>
    );
};

export default TodoListItem;