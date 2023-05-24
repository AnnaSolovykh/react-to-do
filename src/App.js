import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/new' element={<h1>New Todo List</h1>}/>
      </Routes>
    </BrowserRouter>     
  );
}

export default App;
