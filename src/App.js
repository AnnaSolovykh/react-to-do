import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const useSemiPersistentState = () => {

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList"))|| []);

  useEffect(()=>{
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList])
  
  return [todoList, setTodoList]
}

function App() {
const [todoList, setTodoList] = useSemiPersistentState();

const removeTodo = (id) => {
  console.log(todoList)
  const newTodoList = todoList.filter(
    item => item.id !== id 
  );
  setTodoList(newTodoList)
};

const addTodo = (newTodo) => {
  setTodoList(
    [...todoList, newTodo]
  );
  //console.log(newTodo.id)

  // const newToDoList = [];
  // for (let i = 0; i < todoList.length; i++) {
  //   newToDoList.push(todoList[i])
  // };
  // newToDoList.push(newTodo);
  // setTodoList(newToDoList);
  
  if (newTodo.title === "") {
    alert("Write something!")
  }
}

    return (
      <div style={{ 
          display: "flex", 
          flexDirection: "column",  
          alignItems: "center" }}>
        <h1>What are you going to today?</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        <TodoList todoList={todoList} onRemoveItem={removeTodo}/>
      </div>
    );
}

export default App;