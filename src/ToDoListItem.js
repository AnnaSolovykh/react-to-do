import React from "react";
import { useState } from "react";

const TodoListItem = ({todo, onRemoveItem, updateData}) => {
    const [editing, setEditing] = useState(true)
    const [newTitle, setNewTitle] = useState(todo.title)


    const editItem = (event) => {
        const editedTitle = event.target.value;
        setNewTitle(editedTitle);
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (newTitle=== "" || newTitle === " ") {
            alert("Write something!")
        } else {
            setEditing(true);
            updateData(newTitle, todo.id);
        }
    };

    return(
        <>       
            {editing ? (
                <div style={{textAlign:"center",  marginBottom: 20 }}>
                    <p>
                        {newTitle}
                    </p>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <button 
                            style={{margin: 5}}
                            onClick={()=> setEditing(false) }>
                                Edit
                        </button>
                        <button 
                            style={{margin: 5}}
                            onClick={()=> onRemoveItem(todo.id) }>
                                Remove
                        </button>
                    </div>
                </div>
            ):(
                <div style={{textAlign:"center", marginBottom: 20 }}>
                    <form 
                        onSubmit={handleEditItem} 
                        style={{display: "flex", alignItems:"center"}}
                    >
                        <input value={newTitle} onChange={editItem}></input>
                        <button style={{margin: 5}} type="submit">Save</button>
                    </form>
                </div>

            )}
            
        </>
    );
};

export default TodoListItem;