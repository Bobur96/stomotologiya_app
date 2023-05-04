import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Registers';
import Login from "./components/Login";
import Doctor from './pages/Doctors';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/doctor' element={<Doctor />}/>
          <Route path='/navbat' element={<p>Navbat</p>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
