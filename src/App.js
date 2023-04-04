import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList(
      [...todoList, {newTodo}]
    )
  }
  
    return (
      <div style={{ 
          display: "flex", 
          flexDirection: "column",  
          alignItems: "center" }}>
        <h1>What are you going to today?</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        <TodoList todoList={todoList}/>
      </div>
    );
}

export default App;
