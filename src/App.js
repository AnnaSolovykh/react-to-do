import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import "./App.css"
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";

function App() {
  const tableName = process.env.REACT_APP_TABLE_NAME;
  const studiesTableName = process.env.REACT_APP_TABLE_NAME_STUDIES;
  const tableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const tableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route 
              index
              element=
              {<Home
              />}
            />  
            <Route 
              path="studygoals"  
              element=
              {<TodoContainer  
                tableName={studiesTableName}
                tableKey={tableKey}
                tableBaseId={tableBaseId}
              />}
            />  
            <Route 
              path="dailygoals" 
              element=
                {<TodoContainer  
                  tableName={tableName}
                  tableKey={tableKey}
                  tableBaseId={tableBaseId}
                />}
            />        
          </Route>
        </Routes>
      </BrowserRouter>  
    </>
  );
}

export default App;
