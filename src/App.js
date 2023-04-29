import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from "./components/Login"
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
