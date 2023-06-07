import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import style from "./App.module.css"

function App() {
  const tableName = process.env.REACT_APP_TABLE_NAME;
  const studiesTableName = process.env.REACT_APP_TABLE_NAME_STUDIES;
  const tableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const tableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

  return (
    <>
      <BrowserRouter>
        <nav className={style.navbarContainer}>
          <Link className={style.link} to="/" >Studies Tasks Board</Link> 
          <Link className={style.link} to="/TodoContainer" >Family Tasks Board</Link>
        </nav>
        <Routes>
          <Route 
            index 
            element=
            {<TodoContainer  
              tableName={studiesTableName}
              tableKey={tableKey}
              tableBaseId={tableBaseId}
            />}
          />  
          <Route 
            path="TodoContainer" 
            element=
              {<TodoContainer  
                tableName={tableName}
                tableKey={tableKey}
                tableBaseId={tableBaseId}
              />}
          />        
        </Routes>
      <footer>
        <div className={style.phantom}></div>
        <h3 className={style.signature}>Built by Anna Solovykh for CTD</h3>
      </footer>
      </BrowserRouter>  
    </>

  );
}

export default App;
