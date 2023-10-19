import './App.css';
import ToDoList from './ToDoList';

function App() {
  return (
    <div className="App">
      <div className='background'></div>
      <div className='content'>
        <h1>To Do List</h1>
        <ToDoList/>
      </div>
    </div>
  );
}

export default App;
