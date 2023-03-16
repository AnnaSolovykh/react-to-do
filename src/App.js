import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column",  alignItems: "center" }}>
      <h1>ToDo List</h1>
      <AddTodoForm/>
      <TodoList/>
    </div>
  );
}

export default App;
