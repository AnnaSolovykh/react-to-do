import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {

const [todoList, setTodoList] = useState([]);
const [isLoading, setIsLoading] = useState(true)


const fetchData = async() => {
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const options = {
    method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
    };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    const todos = data.records.map((todo) => {
      const newTodo ={
        id: todo.id,
        title: todo.fields.title
      }
      return newTodo
    })

    setTodoList(todos)
    setIsLoading(false)

  } catch (error) {
    console.log(error.message)
  }
};


useEffect(()=> {
  fetchData()
}, []);


const addTodo = async (title) => {
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const airtableData = {
    fields: {
      title: title,
    },
  };

  const options = {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify(airtableData),
  };

  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error has occurred:
        ${response.status}`;
      throw new Error(message);
    }
    const todo = await response.json();
    
    const newTodo = {
      id: todo.id, 
      title: todo.fields.title
    };

    setTodoList([...todoList, newTodo])

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeTodo = async(id) => {
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
  const options = {
    method: "DELETE",
    headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };

   
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error has occurred:
        ${response.status}`;
      throw new Error(message);
    }
  
    const newTodoList = todoList.filter(
      item => item.id !== id 
    );
    setTodoList(newTodoList);

  } catch (error) {
    console.log(error.message);
    return null;
  }

}


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
