import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [newTodo, setNewTodo] = useState('');
  
    return (
      <div style={{ display: "flex", flexDirection: "column",  alignItems: "center" }}>
        <h1>ToDo List</h1>
        <AddTodoForm onAddTodo={setNewTodo}/>
        <p>{newTodo}</p>
        <TodoList/>
      </div>
    );
}

export default App;
