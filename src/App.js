import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {

const [todoList, setTodoList] = useState([]);
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  new Promise ((resolve, reject) => {
    setTimeout(
      () => (resolve)(
        { data: {todoList:
        JSON.parse(localStorage.getItem("savedTodoList"))|| []
      }}
      ),
      2000
    )
  })
  .then (result => {
    setTodoList(result.data.todoList);
    setIsLoading(false);
  })
}, []);


useEffect(()=> {
  if (isLoading === false) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }
}, [todoList, isLoading]);


const removeTodo = (id) => {
  console.log(todoList)
  const newTodoList = todoList.filter(
    item => item.id !== id 
  );
  setTodoList(newTodoList)
};

const addTodo = (newTodo) => {
  if (newTodo.title === "" || newTodo.title === " ") {
    alert("Write something!")
  } else {
    setTodoList(
      [...todoList, newTodo]
    );
  }
};

    return (
      <div style={{ 
          display: "flex", 
          flexDirection: "column",  
          alignItems: "center" }}>
        <h1>What are you going to do today?</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        {isLoading ? (
          <p>Loading...</p>
        ): (
            <TodoList todoList={todoList} onRemoveItem={removeTodo}/>
        )}
      </div>
    );
}

export default App;