import React from 'react';
import './App.css';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Table from './components/Table';
import TodoList from './components/TodoList';
import UserDevice from './components/UsersDevice';
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Navbar from './components/Navbar';

function App() {
  return (
  //   <div>
  //     <Navbar/>
  //   <Router>
  //   <Switch>
  //   <div className='todo-app'>
  //     <Route exact path="/"><TodoList/></Route> 
  //   </div>
  //     <Route exact path="/chart1"><Chart1/></Route> 
  //     <Route exact path="/chart1"><Chart1/></Route> 
  //     <Route exact path="/table"><Table/></Route> 
  //   </Switch>
  //   </Router>
  // </div>
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
// "both": "concurrently \" npm run start\" \"nodemon backend/index.js\""