import React from 'react';

const todoList = [
  {
    id: 1,
    title: "Learn React",
  },

  {
    id: 2,
    title: "Do some exercises",
  },

  {
    id: 3,
    title: "Cook food",
  },
]

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>ToDo List</h1>
      <ul>
        {todoList.map(function(item){
          return <li key={item.id}>
            {item.title}
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
