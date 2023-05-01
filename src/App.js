import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Doctor from './components/Doctor';
import Login from "./components/Login";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/doctor' element={<Doctor />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
