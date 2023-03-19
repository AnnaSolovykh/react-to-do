import React from 'react';

const AddTodoForm = () => {
    return (
        <form style={{ display: "flex", flexDirection: "column",  alignItems: "center", justifyContent: "space-evenly", height: "100px" }}>
            <label htmlFor='todoTitle'>Title</label>
            <input id='todoTitle'/>
            <button type='submit'>Add</button>
        </form>
    );
}

export default AddTodoForm;