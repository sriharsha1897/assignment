import React from 'react';
import './App.css';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Table from './components/Table';
import TodoList from './components/TodoList';
import UserDevice from './components/UsersDevice';


function App() {
  return (
    <div className='todo-app'>
      <TodoList/>
      <UserDevice />
      <Chart1 />
      <Chart2 />
      <Table />
    </div>
  );
}

export default App;
