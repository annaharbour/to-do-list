import './App.css';
import ToDoList from './ToDoList';
import {Home} from './Home'
import {SignIn} from './SignIn'
import {SignUp} from './SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    <div>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={< Home />}></Route> 
            <Route exact path='/list' element={< ToDoList />}></Route> 
            <Route exact path='/login' element={< SignIn />}></Route> 
            <Route exact path='/signup' element={< SignUp />}></Route> 

          </Routes>
        </BrowserRouter>
        {/* Auth ? <ToDoList/> : <Home/> */}
        
    </div>
  );
}

export default App;


